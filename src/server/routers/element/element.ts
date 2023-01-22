import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const elementRouter = router({
  list: publicProcedure.query(() => {
    const listBotElements = `
      PREFIX : <http://example.org/>
      PREFIX bot: <https://w3id.org/bot#>

      SELECT ?s WHERE {
        ?s a bot:Element
      }
    `;

    const botElements = oxigraphStore.query(listBotElements);

    const elementList = botElements.map(
      (element: any) => element.get("s").value
    ) as string[];

    return elementList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const elementName = `${uuidv4()}_${input.name}`;

      const addBotElement = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          :${elementName} a bot:Element .
        }
      `;

      oxigraphStore.update(addBotElement);
      return;
    }),
});
