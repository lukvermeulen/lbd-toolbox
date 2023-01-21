import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const postRouter = router({
  greeting: publicProcedure
    // This is the input schema of your procedure
    // 💡 Tip: Try changing this and see type errors on the client straight away
    .input(
      z.object({
        name: z.string().nullish(),
      })
    )
    .query(({ input }) => {
      // This is what you're returning to your client
      return {
        text: `hello ${input?.name ?? "world"}`,
        message: "trpc is awesome",
        // 💡 Tip: Try adding a new property here and see it propagate to the client straight-away
      };
    }),
});
