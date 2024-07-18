import { Pet } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface ListPetsUseCaseRequest {
  query?: string;
  page?: number;
}

interface ListPetsUseCaseResponse {
  pets: Pet[];
}

export class ListPetsUseCase {
  constructor(private petsRepository: IPetRepository) {}

  async execute({
    query,
    page = 1,
  }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {
    const pets = await this.petsRepository.listAll(query, page);

    if (!pets) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}
