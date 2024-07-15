import { Pet } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface SetPetAdoptedRequest {
  petId: string;
}

interface SetPetAdoptedResponse {
  pet: Pet;
}

export class SetPetAdopted {
  constructor(private petsRepository: IPetRepository) {}

  async execute({
    petId,
  }: SetPetAdoptedRequest): Promise<SetPetAdoptedResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    pet.adopted_at = new Date();

    await this.petsRepository.save(pet);

    return { pet };
  }
}
