import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const pictureRouter = router({
  list: publicProcedure.query(() => {
    const listPictures = `
      PREFIX : <http://example.org/>
      SELECT ?s ?date ?pictureUrl WHERE {
          << ?s a :representation >>
              :representationType :picture ;
              :hasPictureUrl ?pictureUrl ;
              :creationDate ?date;
      }
      ORDER BY ASC(?s)
    `;
    const pictures = oxigraphStore.query(listPictures);

    const pictureList = pictures.map((picture: any) => ({
      name: picture.get("s").value,
      date: picture.get("date").value,
      pictureUrl: picture.get("pictureUrl").value,
    })) as { name: string; date: string; pictureUrl: string }[];

    return pictureList;
  }),

  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),

  add: publicProcedure
    .input(z.object({ name: z.string(), pictureUrl: z.string() }))
    .mutation(async ({ input }) => {
      const pictureName = `${uuidv4()}_${input.name}`;

      const addPicture = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         
        INSERT {
          ?newRep a :representation .

          << ?newRep a :representation >>
            :representationType :picture ;
            :hasPictureUrl "${input.pictureUrl}"^^xsd:string ;
            :creationDate ?currentDate .
        }
        WHERE {
          BIND(:${pictureName} AS ?newRep) .
          BIND( xsd:dateTime(NOW()) AS ?currentDate ) .
        }
      `;

      oxigraphStore.update(addPicture);
      return;
    }),

  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const pictureName = input.name;
      console.log(pictureName);
      const deletePicture = `
          PREFIX : <http://example.org/>
          PREFIX bot: <https://w3id.org/bot#>
            
          DELETE {
            <${pictureName}> a :representation .

            << <${pictureName}> a :representation >>
            :representationType :picture ;
            :creationDate ?creationDate .
          }
          WHERE {}
      `;

      oxigraphStore.update(deletePicture);
      return;
    }),
});
