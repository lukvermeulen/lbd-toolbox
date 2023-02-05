import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";
import { generateSimpleLink } from "../representation/sparql";

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
      ORDER BY ASC(?s)
    `;

      const botZones = oxigraphStore.query(listBotZones);

      const zoneList = botZones.map(
        (zone: any) => zone.get("s").value
      ) as string[];
      return zoneList;
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

  containsZone: publicProcedure
    .input(z.object({ name: z.string(), zoneName: z.string() }))
    .mutation(async ({ input }) => {
      const elementName = input.name;
      const zoneName = input.zoneName;

      const addLink = generateSimpleLink(
        elementName,
        zoneName,
        "bot:containsZone"
      );

      oxigraphStore.update(addLink);
      return;
    }),

  adjacentZone: publicProcedure
    .input(z.object({ name: z.string(), zoneName: z.string() }))
    .mutation(async ({ input }) => {
      const elementName = input.name;
      const zoneName = input.zoneName;

      const addLink = generateSimpleLink(
        elementName,
        zoneName,
        "bot:adjacentZone"
      );

      oxigraphStore.update(addLink);
      return;
    }),

  intersectsZone: publicProcedure
    .input(z.object({ name: z.string(), zoneName: z.string() }))
    .mutation(async ({ input }) => {
      const elementName = input.name;
      const zoneName = input.zoneName;

      const addLink = generateSimpleLink(
        elementName,
        zoneName,
        "bot:intersectsZone"
      );

      oxigraphStore.update(addLink);
      return;
    }),
});
