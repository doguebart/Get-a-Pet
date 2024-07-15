import { PrismaOrgsRepository } from "../../../repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { ListAllOrgPets } from "../../pet/list-all-org-pets";

export const makeListAllOrgPetsUseCase = () => {
  const orgsRepository = new PrismaOrgsRepository();
  const petsRepository = new PrismaPetsRepository();
  const listAllOrgPetsUseCase = new ListAllOrgPets(
    petsRepository,
    orgsRepository
  );

  return listAllOrgPetsUseCase;
};
