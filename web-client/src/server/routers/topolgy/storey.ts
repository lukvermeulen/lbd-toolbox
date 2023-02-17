import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";
import { generateSimpleLink } from "../representation/sparql";

export const storeyRouter = router({
  list: publicProcedure
    .input(z.optional(z.object({ buildings: z.array(z.string()) })))
    .query(({ input }) => {
      const filter = input?.buildings
        .map(
          (building) =>
            `
          <${building}> bot:hasStorey ?s .
        `
        )
        .join("");

      const listBotStoreys = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>

        SELECT ?s WHERE {
          ?s a bot:Storey .
          ${filter ?? ""}
        }
        ORDER BY ASC(?s)
      `;
      const botStoreys = oxigraphStore.query(listBotStoreys);

      const storeyList = botStoreys.map(
        (storey: any) => storey.get("s").value
      ) as string[];

      return storeyList;
    }),

  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const storeyName = `${uuidv4()}_${input.name}`;

      const addBotStorey = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          :${storeyName} a bot:Storey .
        }
      `;

      oxigraphStore.update(addBotStorey);
      return;
    }),

  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const storeyName = input.name;

      const deleteBotStorey = `
          PREFIX : <http://example.org/>
          PREFIX bot: <https://w3id.org/bot#>
            
          DELETE DATA {
            <${storeyName}> a bot:Storey .
          }
      `;

      oxigraphStore.update(deleteBotStorey);
      return;
    }),

  hasStorey: publicProcedure
    .input(z.object({ name: z.string(), storeyName: z.string() }))
    .mutation(async ({ input }) => {
      const elementName = input.name;
      const storeyName = input.storeyName;

      const addHasStorey = generateSimpleLink(
        elementName,
        storeyName,
        "bot:hasStorey"
      );

      oxigraphStore.update(addHasStorey);
      return;
    }),
});
