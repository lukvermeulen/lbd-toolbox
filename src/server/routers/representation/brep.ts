import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";
import {
  generateAddRepresenation,
  generateRemoveRepresentation,
} from "./sparql";

export const brepRouter = router({
  list: publicProcedure.query(() => {
    const listBreps = `
      PREFIX : <http://example.org/>
      SELECT ?s ?date ?fileUrl WHERE {
          << ?s a :representation >>
              :representationType :brep ;
              :hasFileUrl ?fileUrl ;
              :creationDate ?date;
      }
      ORDER BY DESC(?date)
    `;
    const breps = oxigraphStore.query(listBreps);

    const brepList = breps.map((brep: any) => ({
      name: brep.get("s").value,
      date: brep.get("date").value,
      fileUrl: brep.get("fileUrl").value,
    })) as {
      name: string;
      date: string;
      fileUrl: string;
    }[];

    return brepList;
  }),

  add: publicProcedure
    .input(z.object({ name: z.string(), fileUrl: z.string() }))
    .mutation(async ({ input }) => {
      const brepName = `${uuidv4()}_${input.name}`;

      const addBrep = generateAddRepresenation("brep", brepName, input.fileUrl);

      oxigraphStore.update(addBrep);
      return;
    }),

  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const brepName = input.name;

      const deleteFile = generateRemoveRepresentation("brep", brepName);

      oxigraphStore.update(deleteFile);
      return;
    }),
});
