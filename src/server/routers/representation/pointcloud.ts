import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const pointcloudRouter = router({
  list: publicProcedure.query(() => {
    const listPointclouds = `
      PREFIX : <http://example.org/>
      SELECT ?s ?date ?fileUrl WHERE {
          << ?s a :representation >>
              :representationType :pointcloud ;
              :hasFileUrl ?fileUrl ;
              :creationDate ?date;
      }
      ORDER BY ASC(?s)
    `;
    const pointclouds = oxigraphStore.query(listPointclouds);

    const pointcloudList = pointclouds.map((pointcloud: any) => ({
      name: pointcloud.get("s").value,
      date: pointcloud.get("date").value,
      fileUrl: pointcloud.get("fileUrl").value,
    })) as {
      name: string;
      date: string;
      fileUrl: string;
    }[];

    return pointcloudList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string(), fileUrl: z.string() }))
    .mutation(async ({ input }) => {
      const pointcloudName = `${uuidv4()}_${input.name}`;

      const addPointcloud = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         
        INSERT {
          ?newRep a :representation .

          << ?newRep a :representation >>
            :representationType :pointcloud ;
            :hasFileUrl "${input.fileUrl}"^^xsd:string ;
            :creationDate ?currentDate .
        }
        WHERE {
          BIND(:${pointcloudName} AS ?newRep) .
          BIND( xsd:dateTime(NOW()) AS ?currentDate ) .
        }
      `;

      oxigraphStore.update(addPointcloud);
      return;
    }),
  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const pointcloudName = input.name;

      const deleteFile = `
          PREFIX : <http://example.org/>
          PREFIX bot: <https://w3id.org/bot#>
            
          DELETE {
            <${pointcloudName}> a :representation .

            << <${pointcloudName}> a :representation >>
            :representationType :pointcloud ;
            :creationDate ?creationDate .
          }
          WHERE {}
      `;

      oxigraphStore.update(deleteFile);
      return;
    }),
});
