import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const siteRouter = router({
  list: publicProcedure.query(() => {
    return [{ id: uuidv4(), name: "Abc" }];
  }),
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return input.id;
    }),
  add: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const site = {
        id: uuidv4(),
        name: input.name,
      };
      return site;
    }),
});
