/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from "../trpc";
import { elementRouter } from "./element/element";
import { queryRouter } from "./query/query";
import { representationRouter } from "./representation/representation";
import { topologyRouter } from "./topolgy/topology";

export const appRouter = router({
  healthcheck: publicProcedure.query(() => "alive"),

  topology: topologyRouter,
  representation: representationRouter,
  element: elementRouter,
  query: queryRouter,
});

export type AppRouter = typeof appRouter;
