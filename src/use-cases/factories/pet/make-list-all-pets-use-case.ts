import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { ListPetsUseCase } from "../../pet/list-pets";

export const makeListAllPetsUseCase = () => {
  const petsRepository = new PrismaPetsRepository();
  const listAllUseCase = new ListPetsUseCase(petsRepository);

  return listAllUseCase;
};
