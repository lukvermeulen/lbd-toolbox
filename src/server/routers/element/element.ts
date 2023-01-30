import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const elementRouter = router({
  list: publicProcedure.query(() => {
    const listBotElements = `
      PREFIX : <http://example.org/>
      PREFIX bot: <https://w3id.org/bot#>

      SELECT ?s ?buildingelementClass WHERE {
        ?s a bot:Element . 
        
        OPTIONAL {
          ?s :buildingelement ?buildingelementClass .
        }
      }
      ORDER BY ?buildingelementClass ASC(?s)
    `;

    const botElements = oxigraphStore.query(listBotElements);

    const elementList = botElements.map((element: any) => ({
      name: element.get("s").value,
      buildingelementClass: element.get("buildingelementClass")?.value,
    })) as { name: string; buildingelementClass: string }[];

    return elementList;
  }),
  add: publicProcedure
    .input(
      z.object({
        name: z.string(),
        buildingelementClass: z.optional(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const elementName = `${uuidv4()}_${input.name}`;

      const addBuildingelementClass = `
        :${elementName} :buildingelement <${input.buildingelementClass}> .
      `;

      const addBotElement = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          :${elementName} a bot:Element .
          ${input.buildingelementClass ? addBuildingelementClass : ""}
        }
      `;

      oxigraphStore.update(addBotElement);
      return;
    }),
});
