import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const pictureRouter = router({
  list: publicProcedure.query(() => {
    const listPictures = `
      PREFIX : <http://example.org/>
      SELECT ?s WHERE {
          << ?s a :representation >>
              :representationType :picture .
      }
      ORDER BY ASC(?s)
    `;
    const pictures = oxigraphStore.query(listPictures);

    const pictureList = pictures.map(
      (picture: any) => picture.get("s").value
    ) as string[];
    return pictureList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const pictureName = `${uuidv4()}_${input.name}`;

      const addPicture = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         
        INSERT {
          ?newRep a :representation .

          << ?newRep a :representation >>
            :representationType :picture ;
            :creationDate ?currentXsdDate .
        }
        WHERE {
          BIND(:${pictureName} AS ?newRep) .
          BIND( CONCAT( year(?currentDateTime), "-", month(?currentDateTime), "-", day(?currentDateTime) ) AS ?currentDateString ) .
          BIND( xsd:date(?currentDateString) AS ?currentXsdDate )
        }
      `;

      oxigraphStore.update(addPicture);
      return;
    }),
});