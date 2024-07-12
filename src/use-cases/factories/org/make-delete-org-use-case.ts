import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { DeleteOrgUseCase } from "../../org/delete";

export const makeDeleteOrgUseCase = () => {
  const orgsRepository = new PrismaOrgsRepository();
  const deleteUseCase = new DeleteOrgUseCase(orgsRepository);

  return deleteUseCase;
};
