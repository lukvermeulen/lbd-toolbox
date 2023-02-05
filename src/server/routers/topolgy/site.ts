import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const siteRouter = router({
  list: publicProcedure.query(() => {
    const listBotSites = `
      PREFIX : <http://example.org/>
      PREFIX bot: <https://w3id.org/bot#>

      SELECT ?s WHERE {
        ?s a bot:Site
      }
      ORDER BY ASC(?s)
    `;

    const botSites = oxigraphStore.query(listBotSites);

    const siteList = botSites.map(
      (site: any) => site.get("s").value
    ) as string[];

    return siteList;
  }),

  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const siteName = `${uuidv4()}_${input.name}`;

      const addBotSite = `
        PREFIX : <http://example.org/>
        PREFIX bot: <https://w3id.org/bot#>
         
        INSERT DATA {
          :${siteName} a bot:Site .
        }
      `;

      oxigraphStore.update(addBotSite);
      return;
    }),

  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const siteName = input.name;

      const deleteBotSite = `
          PREFIX : <http://example.org/>
          PREFIX bot: <https://w3id.org/bot#>
            
          DELETE DATA {
            <${siteName}> a bot:Site .
          }
      `;

      oxigraphStore.update(deleteBotSite);
      return;
    }),
});
