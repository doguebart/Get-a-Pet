import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { RegisterPetUseCase } from "../../pet/register";

export const makeRegisterPetUseCase = () => {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();
  const registerUseCase = new RegisterPetUseCase(
    petsRepository,
    orgsRepository
  );

  return registerUseCase;
};
