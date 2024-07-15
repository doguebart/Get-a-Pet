import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { GetPetByIdUseCase } from "../../pet/get-pet-by-id";

export const makeGetPetByIdUseCase = () => {
  const petsRepository = new PrismaPetsRepository();
  const registerUseCase = new GetPetByIdUseCase(petsRepository);

  return registerUseCase;
};
