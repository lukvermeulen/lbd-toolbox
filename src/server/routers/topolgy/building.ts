import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const buildingRouter = router({
  list: publicProcedure
    .input(z.optional(z.object({ sites: z.array(z.string()) })))
    .query(({ input }) => {
      const filter = input?.sites
        .map(
          (site) =>
            `
        <${site}> bot:hasBuilding ?s .
      `
        )
        .join("");

      const listBotBuildings = `
      PREFIX : <http://example.org/>
      PREFIX bot: <https://w3id.org/bot#>

      SELECT ?s WHERE {
        ?s a bot:Building .
        ${filter ?? ""}
      }
      ORDER BY ASC(?s)
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

      oxigraphStore.update(addBotBuilding);
      return;
    }),
  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const buildingName = input.name;

      const deleteBotBuilding = `
          PREFIX : <http://example.org/>
          PREFIX bot: <https://w3id.org/bot#>
            
          DELETE DATA {
            <${buildingName}> a bot:Building .
          }
      `;

      oxigraphStore.update(deleteBotBuilding);
      return;
    }),

  hasBuilding: publicProcedure
    .input(z.object({ name: z.string(), buildingName: z.string() }))
    .mutation(async ({ input }) => {
      const elementName = input.name;
      const buildingName = input.buildingName;

      const addHasBuilding = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          <${elementName}> bot:hasBuilding <${buildingName}> .
        }
      `;

      oxigraphStore.update(addHasBuilding);
      return;
    }),
});
