import { PrismaPetsRepository } from "../../../repositories/prisma/prisma-pets-repository";
import { SetPetAdopted } from "../../pet/set-pet-adopted";

export const makeSetPetAdoptedUseCase = () => {
  const petsRepository = new PrismaPetsRepository();
  const setPetAdoptedUseCase = new SetPetAdopted(petsRepository);

  return setPetAdoptedUseCase;
};
