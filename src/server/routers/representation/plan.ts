import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";
import {
  generateAddRepresenation,
  generateListRepresentations,
  generateRemoveRepresentation,
} from "./sparql";

export const planRouter = router({
  list: publicProcedure.query(() => {
    const listPlans = generateListRepresentations("plan");

    const plans = oxigraphStore.query(listPlans);

    const planList = plans.map((plan: any) => ({
      name: plan.get("s").value,
      date: plan.get("date").value,
      fileUrl: plan.get("fileUrl").value,
    })) as {
      name: string;
      date: string;
      fileUrl: string;
    }[];

    return planList;
  }),
  add: publicProcedure
    .input(z.object({ name: z.string(), fileUrl: z.string() }))
    .mutation(async ({ input }) => {
      const planName = `${uuidv4()}_${input.name}`;

      const addPlan = generateAddRepresenation("plan", planName, input.fileUrl);

      oxigraphStore.update(addPlan);
      return;
    }),
  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const planName = input.name;

      const deleteFile = generateRemoveRepresentation("plan", planName);

      oxigraphStore.update(deleteFile);
      return;
    }),
});
