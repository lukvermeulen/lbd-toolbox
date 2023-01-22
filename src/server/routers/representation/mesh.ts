import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const meshRouter = router({
  list: publicProcedure.query(() => {
    const listMeshes = `
      PREFIX : <http://example.org/>
      SELECT ?s WHERE {
          << ?s a :representation >>
              :representationType :mesh .
      }
      ORDER BY ASC(?s)
    `;
    const meshes = oxigraphStore.query(listMeshes);

    const meshList = meshes.map((mesh: any) => mesh.get("s").value) as string[];
    return meshList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const meshName = `${uuidv4()}_${input.name}`;

      const addMesh = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         
        INSERT {
          ?newRep a :representation .

          << ?newRep a :representation >>
            :representationType :mesh ;
            :creationDate ?currentXsdDate .
        }
        WHERE {
          BIND(:${meshName} AS ?newRep) .
          BIND( CONCAT( year(?currentDateTime), "-", month(?currentDateTime), "-", day(?currentDateTime) ) AS ?currentDateString ) .
          BIND( xsd:date(?currentDateString) AS ?currentXsdDate )
        }
      `;

      oxigraphStore.update(addMesh);
      return;
    }),
});
