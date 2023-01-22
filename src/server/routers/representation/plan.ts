import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const planRouter = router({
  list: publicProcedure.query(() => {
    const listPlans = `
      PREFIX : <http://example.org/>
      SELECT ?s WHERE {
          << ?s a :representation >>
              :representationType :plan .
      }
      ORDER BY ASC(?s)
    `;
    const plans = oxigraphStore.query(listPlans);

    const planList = plans.map((plan: any) => plan.get("s").value) as string[];
    return planList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const planName = `${uuidv4()}_${input.name}`;

      const addPlan = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         
        INSERT {
          ?newRep a :representation .

          << ?newRep a :representation >>
            :representationType :plan ;
            :creationDate ?currentXsdDate .
        }
        WHERE {
          BIND(:${planName} AS ?newRep) .
          BIND( CONCAT( year(?currentDateTime), "-", month(?currentDateTime), "-", day(?currentDateTime) ) AS ?currentDateString ) .
          BIND( xsd:date(?currentDateString) AS ?currentXsdDate )
        }
      `;

      oxigraphStore.update(addPlan);
      return;
    }),
});
