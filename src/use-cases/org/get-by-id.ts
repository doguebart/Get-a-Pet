import { Org } from "@prisma/client";
import { IOrgRepository } from "../../repositories/orgs-repository";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetOrgByIdRequest {
  orgId: string;
}

interface GetOrgByIdResponse {
  org: Org;
}

export class GetOrgByIdUseCase {
  constructor(private orgsRepository: IOrgRepository) {}

  async execute({ orgId }: GetOrgByIdRequest): Promise<GetOrgByIdResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) {
      throw new ResourceNotFoundError();
    }

    return { org };
  }
}
