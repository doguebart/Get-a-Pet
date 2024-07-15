import { Pet } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetByIdUseCaseRequest {
  petId: string;
}

interface GetPetByIdUseCaseResponse {
  pet: Pet;
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: IPetRepository) {}

  async execute({
    petId,
  }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    return { pet };
  }
}
