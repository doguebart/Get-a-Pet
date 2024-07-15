import { Pet } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ListPetsUseCaseResponse {
  pets: Pet[];
}

export class ListPetsUseCase {
  constructor(private petsRepository: IPetRepository) {}

  async execute(): Promise<ListPetsUseCaseResponse> {
    const pets = await this.petsRepository.listAll();

    if (!pets) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}
