import { Pet } from "@prisma/client";
import { IPetRepository } from "../../repositories/pets-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { IOrgRepository } from "../../repositories/orgs-repository";

interface ListPetsUseCaseRequest {
  orgId: string;
}

interface ListPetsUseCaseResponse {
  pets: Pet[];
}

export class ListAllOrgPets {
  constructor(
    private petsRepository: IPetRepository,
    private orgsRepository: IOrgRepository
  ) {}

  async execute({
    orgId,
  }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    const pets = await this.petsRepository.listAllOrgPets(orgId);

    if (!pets) {
      throw new ResourceNotFoundError();
    }

    return { pets };
  }
}
