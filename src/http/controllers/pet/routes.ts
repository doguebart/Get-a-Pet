import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getPetById } from "./get-by-id";
import { listAllPets } from "./list-all";
import { listAllOrgPets } from "./list-all-org-pets";
import { setPetAdopted } from "./set-pet-adopted";
import { deleteById } from "./delete";
import { update } from "./update";
import { verifyJWT } from "../../middleware/verify-jwt";

export const petRoutes = async (app: FastifyInstance) => {
  app.get("/pets/:petId", getPetById);
  app.get("/pets", listAllPets);
  app.get("/org/:orgId/pets", listAllOrgPets);

  app.post("/pets", { onRequest: [verifyJWT] }, register);
  app.patch("/pets/adopted/:petId", { onRequest: [verifyJWT] }, setPetAdopted);
  app.delete("/pets/:petId", { onRequest: [verifyJWT] }, deleteById);
  app.patch("/pets/:petId", { onRequest: [verifyJWT] }, update);
};
