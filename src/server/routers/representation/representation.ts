import { router } from "../../trpc";
import { pictureRouter } from "./picture";
import { meshRouter } from "./mesh";
import { brepRouter } from "./brep";
import { pointcloudRouter } from "./pointcloud";
import { planRouter } from "./plan";

export const representationRouter = router({
  picture: pictureRouter,
  mesh: meshRouter,
  brep: brepRouter,
  pointcloud: pointcloudRouter,
  plan: planRouter,
});
