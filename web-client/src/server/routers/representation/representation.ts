import { publicProcedure, router } from "../../trpc";
import { pictureRouter } from "./picture";
import { meshRouter } from "./mesh";
import { brepRouter } from "./brep";
import { pointcloudRouter } from "./pointcloud";
import { planRouter } from "./plan";
import { z } from "zod";
import { oxigraphStore } from "~/server/oxigraph-store";
import { generateListRepresentationsOfElement } from "./sparql";

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

      const previousList = previousRepresentations.map((previousRep: any) => ({
        name: previousRep.get("result").value,
        date: previousRep.get("date").value,
        fileUrl: previousRep.get("fileUrl").value,
        pictureUrl: previousRep.get("pictureUrl").value,
      })) as {
        name: string;
        date: string;
        fileUrl: string;
        pictureUrl: string;
      }[];

      return previousList;
    }),
  listRepresentations: publicProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.optional(z.string()),
      })
    )
    .query(({ input }) => {
      const listAllRepresentations = generateListRepresentationsOfElement(
        input.name,
        input.type as any
      );

      const representations = oxigraphStore.query(listAllRepresentations);

      const previousList = representations.map((representation: any) => ({
        name: representation.get("representation").value,
        date: representation.get("date").value,
        fileUrl: representation.get("fileUrl").value,
        pictureUrl: representation.get("pictureUrl")?.value,
      })) as {
        name: string;
        date: string;
        fileUrl: string;
        pictureUrl: string;
      }[];

      return previousList;
    }),
});
