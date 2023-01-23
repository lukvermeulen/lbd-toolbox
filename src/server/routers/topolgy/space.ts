import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const spaceRouter = router({
  list: publicProcedure.query(() => {
    const listBotSpaces = `
      PREFIX : <http://example.org/>
      PREFIX bot: <https://w3id.org/bot#>

      SELECT ?s WHERE {
        ?s a bot:Space
      }
    `;

    const botSpaces = oxigraphStore.query(listBotSpaces);

    const spaceList = botSpaces.map(
      (space: any) => space.get("s").value
    ) as string[];
    return spaceList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const spaceName = `${uuidv4()}_${input.name}`;

      const addBotSpace = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          :${spaceName} a bot:Space .
        }
      `;

      oxigraphStore.update(addBotSpace);
      return;
    }),
  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const spaceName = input.name;

      const deleteBotSpace = `
          PREFIX : <http://example.org/>
          PREFIX bot: <https://w3id.org/bot#>
            
          DELETE DATA {
            <${spaceName}> a bot:Space .
          }
      `;

      oxigraphStore.update(deleteBotSpace);
      return;
    }),
});
