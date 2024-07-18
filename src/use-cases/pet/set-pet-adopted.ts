import { Pet } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

interface SetPetAdoptedRequest {
  petId: string;
  orgId: string;
}

interface SetPetAdoptedResponse {
  pet: Pet;
}

export class SetPetAdopted {
  constructor(private petsRepository: IPetRepository) {}

  async execute({
    petId,
    orgId,
  }: SetPetAdoptedRequest): Promise<SetPetAdoptedResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    if (pet.orgId !== orgId) {
      throw new UnauthorizedError();
    }

    pet.adopted_at = new Date();

    await this.petsRepository.save(pet);

    return { pet };
  }
}
