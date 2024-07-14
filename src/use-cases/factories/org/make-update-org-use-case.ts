import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { UpdateOrgUseCase } from "../../org/update";

export const makeUpdateOrgUseCase = () => {
  const orgsRepository = new PrismaOrgsRepository();
  const updateUseCase = new UpdateOrgUseCase(orgsRepository);

  return updateUseCase;
};
