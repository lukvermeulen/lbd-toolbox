import { router, publicProcedure } from "../../trpc";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { oxigraphStore } from "~/server/oxigraph-store";
import {
  generateAddRepresenation,
  generateRemoveRepresentation,
} from "./sparql";

export const pointcloudRouter = router({
  list: publicProcedure.query(() => {
    const listPointclouds = `
      PREFIX : <http://example.org/>
      SELECT ?s ?date ?fileUrl WHERE {
          << ?s a :representation >>
              :representationType :pointcloud ;
              :hasFileUrl ?fileUrl ;
              :creationDate ?date;
      }
      ORDER BY DESC(?date)
    `;
    const pointclouds = oxigraphStore.query(listPointclouds);

    const pointcloudList = pointclouds.map((pointcloud: any) => ({
      name: pointcloud.get("s").value,
      date: pointcloud.get("date").value,
      fileUrl: pointcloud.get("fileUrl").value,
    })) as {
      name: string;
      date: string;
      fileUrl: string;
    }[];

    return pointcloudList;
  }),

  add: publicProcedure
    .input(z.object({ name: z.string(), fileUrl: z.string() }))
    .mutation(async ({ input }) => {
      const pointcloudName = `${uuidv4()}_${input.name}`;

      const addPointcloud = generateAddRepresenation(
        "pointcloud",
        pointcloudName,
        input.fileUrl
      );

      oxigraphStore.update(addPointcloud);
      return;
    }),

  remove: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input }) => {
      const pointcloudName = input.name;

      const deleteFile = generateRemoveRepresentation(
        "pointcloud",
        pointcloudName
      );

      oxigraphStore.update(deleteFile);
      return;
    }),
});
