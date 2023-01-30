import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const meshRouter = router({
  list: publicProcedure.query(() => {
    const listMeshes = `
      PREFIX : <http://example.org/>
      SELECT ?s ?date ?fileUrl WHERE {
          << ?s a :representation >>
              :representationType :mesh ;
              :hasFileUrl ?fileUrl ;
              :creationDate ?date;
      }
      ORDER BY DESC(?date)
    `;
    const meshes = oxigraphStore.query(listMeshes);

    const meshList = meshes.map((mesh: any) => ({
      name: mesh.get("s").value,
      date: mesh.get("date").value,
      fileUrl: mesh.get("fileUrl").value,
    })) as {
      name: string;
      date: string;
      fileUrl: string;
    }[];

    return meshList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string(), fileUrl: z.string() }))
    .mutation(async ({ input }) => {
      const meshName = `${uuidv4()}_${input.name}`;

      const addMesh = `
      PREFIX : <http://example.org/>
      PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
       
      INSERT {
        ?newRep a :representation .

        << ?newRep a :representation >>
          :representationType :mesh ;
          :hasFileUrl "${input.fileUrl}"^^xsd:string ;
          :creationDate ?currentDate .
      }
      WHERE {
        BIND(:${meshName} AS ?newRep) .
        BIND( xsd:dateTime(NOW()) AS ?currentDate ) .
      }
    `;

      oxigraphStore.update(addMesh);
      return;
    }),
  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const meshName = input.name;

      const deleteFile = `
          PREFIX : <http://example.org/>
          PREFIX bot: <https://w3id.org/bot#>
            
          DELETE {
            <${meshName}> a :representation .

            << <${meshName}> a :representation >>
            :representationType :mesh ;
            :creationDate ?creationDate .
          }
          WHERE {}
      `;

      oxigraphStore.update(deleteFile);
      return;
    }),
});
