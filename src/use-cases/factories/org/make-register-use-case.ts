import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { RegisterOrgUseCase } from "../../org/register";

export const makeRegisterUseCase = () => {
  const orgsRepository = new PrismaOrgsRepository();
  const registerUseCase = new RegisterOrgUseCase(orgsRepository);

  return registerUseCase;
};
