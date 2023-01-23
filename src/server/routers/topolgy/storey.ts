import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const storeyRouter = router({
  list: publicProcedure.query(() => {
    const listBotStoreys = `
      PREFIX : <http://example.org/>
      PREFIX bot: <https://w3id.org/bot#>

      SELECT ?s WHERE {
        ?s a bot:Storey
      }
    `;

    const botStoreys = oxigraphStore.query(listBotStoreys);

    const storeyList = botStoreys.map(
      (storey: any) => storey.get("s").value
    ) as string[];

    return storeyList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
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

      const addHasStorey = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          <${elementName}> bot:hasStorey <${storeyName}> .
        }
      `;

      oxigraphStore.update(addHasStorey);
      return;
    }),
});
