import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const spaceRouter = router({
  list: publicProcedure
    .input(z.optional(z.object({ storeys: z.array(z.string()) })))
    .query(({ input }) => {
      const filter = input?.storeys
        .map(
          (storey) =>
            `
          <${storey}> bot:hasSpace ?s .
        `
        )
        .join("");

      const listBotSpaces = `
      PREFIX : <http://example.org/>
      PREFIX bot: <https://w3id.org/bot#>

      SELECT ?s WHERE {
        ?s a bot:Space .
        ${filter ?? ""}
      }
      ORDER BY ASC(?s)
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

  hasSpace: publicProcedure
    .input(z.object({ name: z.string(), spaceName: z.string() }))
    .mutation(async ({ input }) => {
      const elementName = input.name;
      const spaceName = input.spaceName;

      const addHasSpace = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          <${elementName}> bot:hasSpace <${spaceName}> .
        }
      `;

      oxigraphStore.update(addHasSpace);
      return;
    }),
});
