import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getPetById } from "./get-by-id";
import { listAllPets } from "./list-all";
import { listAllOrgPets } from "./list-all-org-pets";

export const petRoutes = async (app: FastifyInstance) => {
  app.post("/pets", register);
  app.get("/pets/:petId", getPetById);
  app.get("/pets", listAllPets);
  app.get("/org/:orgId/pets", listAllOrgPets);
};
