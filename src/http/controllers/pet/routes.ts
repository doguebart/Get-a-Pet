import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getPetById } from "./get-by-id";
import { listAllPets } from "./list-all";
import { listAllOrgPets } from "./list-all-org-pets";
import { setPetAdopted } from "./set-pet-adopted";
import { deleteById } from "./delete";
import { update } from "./update";

export const petRoutes = async (app: FastifyInstance) => {
  app.post("/pets", register);
  app.get("/pets/:petId", getPetById);
  app.get("/pets", listAllPets);
  app.get("/org/:orgId/pets", listAllOrgPets);
  app.patch("/pets/adopted/:petId", setPetAdopted);
  app.delete("/pets/:petId", deleteById);
  app.patch("/pets/:petId", update);
};
