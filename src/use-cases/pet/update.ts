import { $Enums } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdatePetUseCaseRequest {
  petId: string;
  name: string;
  specie: $Enums.PetSpecie;
  size: $Enums.PetSize;
  age: $Enums.PetAge;
  characteristics: string[];
}

export class UpdatePetUseCase {
  constructor(private petsRepository: IPetRepository) {}

  async execute({
    petId,
    name,
    specie,
    size,
    age,
    characteristics,
  }: UpdatePetUseCaseRequest) {
    const org = await this.petsRepository.findById(petId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    await this.petsRepository.update(petId, {
      name,
      specie,
      size,
      age,
      characteristics,
    });
  }
}
