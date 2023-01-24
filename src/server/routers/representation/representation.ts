import { publicProcedure, router } from "../../trpc";
import { pictureRouter } from "./picture";
import { meshRouter } from "./mesh";
import { brepRouter } from "./brep";
import { pointcloudRouter } from "./pointcloud";
import { planRouter } from "./plan";
import { z } from "zod";
import { oxigraphStore } from "~/server/oxigraph-store";

export const representationRouter = router({
  picture: pictureRouter,
  mesh: meshRouter,
  brep: brepRouter,
  pointcloud: pointcloudRouter,
  plan: planRouter,
  representedBy: publicProcedure
    .input(
      z.object({
        element: z.string(),
        representation: z.string(),
        active: z.boolean(),
      })
    )
    .mutation(async ({ input }) => {
      const addPicture = `
        PREFIX : <http://example.org/>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
         
        INSERT {
          ?element :representedBy ?representation . 
          << ?element :representedBy ?representation >>
            :active ${input.active} ;
            :creationDate ?currentDate .
        }
        WHERE {
          BIND(<${input.element}> AS ?element) .
          BIND(<${input.representation}> AS ?representation) .
          BIND( xsd:dateTime(NOW()) AS ?currentDate ) .
        }
      `;

      oxigraphStore.update(addPicture);
      return;
    }),
});
