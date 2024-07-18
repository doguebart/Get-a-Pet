import { Pet } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { IOrgRepository } from "../../repositories/orgs-repository";

interface ListPetsUseCaseRequest {
  orgId: string;
  query?: string;
  page?: number;
}

interface ListPetsUseCaseResponse {
  pets: Pet[];
}

export class ListAllOrgPetsUseCase {
  constructor(
    private petsRepository: IPetRepository,
    private orgsRepository: IOrgRepository
  ) {}

  async execute({
    orgId,
    query,
    page = 1,
  }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pets = await this.petsRepository.listAllOrgPets(orgId, query, page);

    if (!pets) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}
