import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { DeletePetUseCase } from "../../pet/delete-pet";

export const makeDeletePetByIdUseCase = () => {
  const petsRepository = new PrismaPetsRepository();
  const deletePetByIdUseCase = new DeletePetUseCase(petsRepository);

  return deletePetByIdUseCase;
};
