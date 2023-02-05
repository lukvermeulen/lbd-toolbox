import { publicProcedure, router } from "../../trpc";
import { pictureRouter } from "./picture";
import { meshRouter } from "./mesh";
import { brepRouter } from "./brep";
import { pointcloudRouter } from "./pointcloud";
import { planRouter } from "./plan";
import { z } from "zod";
import { oxigraphStore } from "~/server/oxigraph-store";

export const representationRouter = router({
  picture: pictureRouter,
  mesh: meshRouter,
  brep: brepRouter,
  pointcloud: pointcloudRouter,
  plan: planRouter,
  representedBy: publicProcedure
    .input(
      z.object({
        element: z.string(),
        representation: z.string(),
        status: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const addRepresentation = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         
        INSERT {
          # link statement
          ?element :representedBy ?representation . 

          # meta information
          ?t
            :creationDate ?currentDate .
          
          # status information
          ?t
            :hasStatus "${input.status}" .
          
          # status meta information
          << ?t :hasStatus "${input.status}" >>
            :date ?currentDate .
        }
        WHERE {
          BIND( <${input.element}> AS ?element) .
          BIND( <${input.representation}> AS ?representation) .
          BIND( << ?element :representedBy ?representation >> AS ?t ) .
          BIND( xsd:dateTime(NOW()) AS ?currentDate ) .
        }
      `;

      console.log(addRepresentation);

      oxigraphStore.update(addRepresentation);
      return;
    }),

  listPrevious: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      const listPrevious = `
      PREFIX : <http://example.org/>

      SELECT ?result ?fileUrl ?pictureUrl ?date WHERE {
          << <${input.name}> a :representation >>
              :hasPreviousRepresentation* ?prevRep .
              
          ?prevRep 
              :hasFileUrl ?fileUrl ;
              :hasPictureUrl ?pictureUrl ;
              :creationDate ?date .

          BIND( SUBJECT(?prevRep) as ?result) .
      }
      ORDER BY DESC(?date)
    `;
      const previousRepresentations = oxigraphStore.query(listPrevious);

      const previousList = previousRepresentations.map((picture: any) => ({
        name: picture.get("result").value,
        date: picture.get("date").value,
        fileUrl: picture.get("fileUrl").value,
        pictureUrl: picture.get("pictureUrl").value,
      })) as {
        name: string;
        date: string;
        fileUrl: string;
        pictureUrl: string;
      }[];
      console.log(previousList);
      return previousList;
    }),
});
