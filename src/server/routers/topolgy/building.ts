import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const buildingRouter = router({
  list: publicProcedure.query(() => {
    const listBotBuildings = `
      PREFIX : <http://example.org/>
      PREFIX bot: <https://w3id.org/bot#>

      SELECT ?s WHERE {
        ?s a bot:Building
      }
    `;

    const botBuildings = oxigraphStore.query(listBotBuildings);

    const buildingList = botBuildings.map(
      (building: any) => building.get("s").value
    ) as string[];

    return buildingList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const buildingName = `${uuidv4()}_${input.name}`;

      const addBotBuilding = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          :${buildingName} a bot:Building .
        }
      `;

      // oxigraphStore.update(
      //   `PREFIX : <http://example.org/>
      //   DELETE WHERE { ?s ?p ?o }`
      // );
      oxigraphStore.update(addBotBuilding);
      return;
    }),
});
