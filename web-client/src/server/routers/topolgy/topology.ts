import { router, publicProcedure } from "../../trpc";
import { zoneRouter } from "./zone";
import { buildingRouter } from "./building";
import { siteRouter } from "./site";
import { storeyRouter } from "./storey";
import { spaceRouter } from "./space";

export const topologyRouter = router({
  zone: zoneRouter,
  site: siteRouter,
  building: buildingRouter,
  storey: storeyRouter,
  space: spaceRouter,
});
