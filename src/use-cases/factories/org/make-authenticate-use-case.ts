import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { AuthenticateOrgUseCase } from "../../org/authenticate";

export const makeAuthenticateOrgUseCase = () => {
  const orgsRepository = new PrismaOrgsRepository();
  const authenticateUseCase = new AuthenticateOrgUseCase(orgsRepository);

  return authenticateUseCase;
};
