import { $Enums } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

interface UpdatePetUseCaseRequest {
  orgId: string;
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
    orgId,
    petId,
    name,
    specie,
    size,
    age,
    characteristics,
  }: UpdatePetUseCaseRequest) {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    if (pet.orgId !== orgId) {
      throw new UnauthorizedError();
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
