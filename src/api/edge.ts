
import { sunriseRouter } from "./sunrise/sunriseRouter";
import { createTRPCRouter } from "./trpc";

// Deployed to /trpc/edge/**
export const edgeRouter = createTRPCRouter({
  sunrise: sunriseRouter,
});