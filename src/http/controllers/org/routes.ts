import { FastifyInstance } from "fastify";
import { register } from "./register";
import { getOrgById } from "./get-by-id";
import { deleteOrg } from "./delete";

export const orgsRoutes = async (app: FastifyInstance) => {
  app.post("/orgs", register);

  app.get("/orgs/:orgId", getOrgById);

  app.delete("/orgs/:orgId", deleteOrg);
};
