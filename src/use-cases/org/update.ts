import { IOrgRepository } from "../../repositories/orgs-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface UpdateOrgUseCaseRequest {
  orgId: string;
  name?: string;
  description?: string;
  zip_code?: string;
  state?: string;
  city?: string;
  address?: string;
}

export class UpdateOrgUseCase {
  constructor(private orgsRepository: IOrgRepository) {}

  async execute({
    orgId,
    name,
    description,
    zip_code,
    state,
    city,
    address,
  }: UpdateOrgUseCaseRequest) {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    await this.orgsRepository.update(orgId, {
      name,
      description,
      zip_code,
      state,
      city,
      address,
    });
  }
}
