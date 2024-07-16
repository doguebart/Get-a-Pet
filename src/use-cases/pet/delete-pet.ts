import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeletePetUseCaseRequest {
  petId: string;
}

export class DeletePetUseCase {
  constructor(private petsRepository: IPetRepository) {}

  async execute({ petId }: DeletePetUseCaseRequest) {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    await this.petsRepository.delete(petId);

    return { pet };
  }
}
