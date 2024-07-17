import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { UpdatePetUseCase } from "../../pet/update";

export const makeUpdatePetUseCase = () => {
  const petsRepository = new PrismaPetsRepository();
  const updatePetUseCase = new UpdatePetUseCase(petsRepository);

  return updatePetUseCase;
};
