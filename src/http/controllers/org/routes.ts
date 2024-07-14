import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getOrgById } from "./get-by-id";
import { deleteOrg } from "./delete";
import { updateOrg } from "./update";

export const orgsRoutes = async (app: FastifyInstance) => {
  app.post("/orgs", register);
  app.get("/orgs/:orgId", getOrgById);
  app.delete("/orgs/:orgId", deleteOrg);
  app.patch("/orgs/:orgId", updateOrg);
};
