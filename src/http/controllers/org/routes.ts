import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getOrgById } from "./get-by-id";
import { deleteOrg } from "./delete";
import { updateOrg } from "./update";
import { authenticate } from "./authenticate";
import { verifyJWT } from "../../middleware/verify-jwt";
import { refresh } from "./refresh";

export const orgsRoutes = async (app: FastifyInstance) => {
  app.post("/orgs", register);
  app.post("/sessions", authenticate);
  app.get("/orgs/:orgId", getOrgById);

  app.patch("/token/refresh", { onRequest: [verifyJWT] }, refresh);
  app.delete("/orgs/:orgId", { onRequest: [verifyJWT] }, deleteOrg);
  app.patch("/orgs/:orgId", { onRequest: [verifyJWT] }, updateOrg);
};
