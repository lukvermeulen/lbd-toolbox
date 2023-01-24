import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const zoneRouter = router({
  list: publicProcedure
    .input(z.optional(z.object({ linkName: z.string(), linkType: z.string() })))
    .query(() => {
      const listBotZones = `
      PREFIX : <http://example.org/>
      PREFIX bot: <https://w3id.org/bot#>

      SELECT ?s WHERE {
        ?s a bot:Zone
      }
    `;

      const botZones = oxigraphStore.query(listBotZones);

      const zoneList = botZones.map(
        (zone: any) => zone.get("s").value
      ) as string[];
      return zoneList;
    }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const zoneName = `${uuidv4()}_${input.name}`;

      const addBotZone = `
          PREFIX : <http://example.org/>
          PREFIX bot: <https://w3id.org/bot#>
           
          INSERT DATA {
            :${zoneName} a bot:Zone .
          }
        `;

      oxigraphStore.update(addBotZone);
      return;
    }),
  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const zoneName = input.name;

      const deleteBotZone = `
          PREFIX : <http://example.org/>
          PREFIX bot: <https://w3id.org/bot#>
            
          DELETE DATA {
            <${zoneName}> a bot:Zone .
          }
      `;

      oxigraphStore.update(deleteBotZone);
      return;
    }),
});
