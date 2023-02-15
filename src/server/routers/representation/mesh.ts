import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";
import {
  generateAddRepresenation,
  generateListRepresentations,
  generateRemoveRepresentation,
} from "./sparql";

export const meshRouter = router({
  list: publicProcedure.query(() => {
    const listMeshes = generateListRepresentations("mesh");
    const meshes = oxigraphStore.query(listMeshes);

    const meshList = meshes.map((mesh: any) => ({
      name: mesh.get("s").value,
      date: mesh.get("date").value,
      fileUrl: mesh.get("fileUrl").value,
    })) as {
      name: string;
      date: string;
      fileUrl: string;
    }[];

    return meshList;
  }),
  add: publicProcedure
    .input(z.object({ name: z.string(), fileUrl: z.string() }))
    .mutation(async ({ input }) => {
      const meshName = `${uuidv4()}_${input.name}`;

      const addMesh = generateAddRepresenation("mesh", meshName, input.fileUrl);

      oxigraphStore.update(addMesh);
      return meshName;
    }),
  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const meshName = input.name;

      const deleteFile = generateRemoveRepresentation("mesh", meshName);

      oxigraphStore.update(deleteFile);
      return;
    }),
});
