import { IOrgRepository } from "../../repositories/orgs-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface DeleteOrgUseCaseRequest {
  orgId: string;
}

export class DeleteOrgUseCase {
  constructor(private orgsRepository: IOrgRepository) {}

  async execute({ orgId }: DeleteOrgUseCaseRequest) {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    await this.orgsRepository.delete(orgId);
  }
}
