import { FastifyInstance } from "fastify";
import { register } from "./register";

export const petRoutes = async (app: FastifyInstance) => {
  app.post("/pets", register);
};
