import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const pointcloudRouter = router({
  list: publicProcedure.query(() => {
    const listPointclouds = `
      PREFIX : <http://example.org/>
      SELECT ?s WHERE {
          << ?s a :representation >>
              :representationType :pointcloud .
      }
      ORDER BY ASC(?s)
    `;
    const pointclouds = oxigraphStore.query(listPointclouds);

    const pointcloudList = pointclouds.map(
      (pointcloud: any) => pointcloud.get("s").value
    ) as string[];
    return pointcloudList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const pointcloudName = `${uuidv4()}_${input.name}`;

      const addPointcloud = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         
        INSERT {
          ?newRep a :representation .

          << ?newRep a :representation >>
            :representationType :pointcloud ;
            :creationDate ?currentXsdDate .
        }
        WHERE {
          BIND(:${pointcloudName} AS ?newRep) .
          BIND( CONCAT( year(?currentDateTime), "-", month(?currentDateTime), "-", day(?currentDateTime) ) AS ?currentDateString ) .
          BIND( xsd:date(?currentDateString) AS ?currentXsdDate )
        }
      `;

      oxigraphStore.update(addPointcloud);
      return;
    }),
});
