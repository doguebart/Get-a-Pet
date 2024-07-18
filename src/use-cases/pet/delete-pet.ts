import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UnauthorizedError } from "../errors/unauthorized-error";

interface DeletePetUseCaseRequest {
  petId: string;
  orgId: string;
}

export class DeletePetUseCase {
  constructor(private petsRepository: IPetRepository) {}

  async execute({ petId, orgId }: DeletePetUseCaseRequest) {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) {
      throw new ResourceNotFoundError();
    }

    if (pet.orgId !== orgId) {
      throw new UnauthorizedError();
    }

    await this.petsRepository.delete(petId);

    return { pet };
  }
}
