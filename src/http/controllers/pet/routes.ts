import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getPetById } from "./get-by-id";
import { listAllPets } from "./list-all";

export const petRoutes = async (app: FastifyInstance) => {
  app.post("/pets", register);
  app.get("/pets/:petId", getPetById);
  app.get("/pets", listAllPets);
};
