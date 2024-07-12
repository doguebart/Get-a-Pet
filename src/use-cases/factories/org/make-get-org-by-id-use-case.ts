import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { GetOrgByIdUseCase } from "../../org/get-by-id";

export const makeGetOrgByIdUseCase = () => {
  const orgsRepository = new PrismaOrgsRepository();
  const getByIdUseCase = new GetOrgByIdUseCase(orgsRepository);

  return getByIdUseCase;
};
