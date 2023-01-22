import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";

export const brepRouter = router({
  list: publicProcedure.query(() => {
    const listBreps = `
      PREFIX : <http://example.org/>
      SELECT ?s WHERE {
          << ?s a :representation >>
              :representationType :brep .
      }
      ORDER BY ASC(?s)
    `;
    const breps = oxigraphStore.query(listBreps);

    const brepList = breps.map((brep: any) => brep.get("s").value) as string[];
    return brepList;
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const brepName = `${uuidv4()}_${input.name}`;

      const addBrep = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         
        INSERT {
          ?newRep a :representation .

          << ?newRep a :representation >>
            :representationType :brep ;
            :creationDate ?currentXsdDate .
        }
        WHERE {
          BIND(:${brepName} AS ?newRep) .
          BIND( CONCAT( year(?currentDateTime), "-", month(?currentDateTime), "-", day(?currentDateTime) ) AS ?currentDateString ) .
          BIND( xsd:date(?currentDateString) AS ?currentXsdDate )
        }
      `;

      oxigraphStore.update(addBrep);
      return;
    }),
});
