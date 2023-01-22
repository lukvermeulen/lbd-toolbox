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
      console.log(storeyName);

      const addBotStorey = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          :${storeyName} a bot:Storey .
        }
      `;

      // oxigraphStore.update(
      //   `PREFIX : <http://example.org/>
      //   DELETE WHERE { ?s ?p ?o }`
      // );
      oxigraphStore.update(addBotStorey);
      return;
    }),
});
