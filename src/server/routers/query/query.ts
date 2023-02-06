import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";
import { Literal, NamedNode, Quad } from "oxigraph";

export const queryRouter = router({
  query: publicProcedure
    .input(z.object({ queryString: z.string() }))
    .query(({ input }) => {
      const results: Map<string, NamedNode | Quad | Literal>[] =
        oxigraphStore.query(input.queryString);

      const resultList = results.map((element) => {
        const singleResult: {
          [key: string]: string | { s: string; p: string; o: string };
        } = {};

        element.forEach((value, key) => {
          if (value instanceof Quad) {
            singleResult[key] = {
              s: value.subject.value,
              p: value.predicate.value,
              o: value.object.value,
            };
          } else {
            singleResult[key] = value.value;
          }
        });

        return singleResult;
      });

      return resultList;
    }),

  update: publicProcedure
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
