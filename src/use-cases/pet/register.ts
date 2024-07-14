import { $Enums, Pet } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { IOrgRepository } from "../../repositories/orgs-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface RegisterPetUseCaseRequest {
  orgId: string;
  name: string;
  specie: $Enums.PetSpecie;
  size: $Enums.PetSize;
  age: $Enums.PetAge;
  characteristics: string[];
}

interface RegisterPetUseCaseResponse {
  pet: Pet;
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: IPetRepository,
    private orgsRepository: IOrgRepository
  ) {}

  async execute({
    orgId,
    name,
    specie,
    size,
    age,
    characteristics,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petsRepository.create({
      orgId,
      name,
      specie,
      size,
      age,
      characteristics,
    });

    return { pet };
  }
}
