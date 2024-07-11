import { Org } from "@prisma/client";
import { IOrgRepository } from "../../repositories/orgs-repository";
import { hash } from "bcryptjs";

interface RegisterOrgUseCaseRequest {
  name: string;
  description: string;
  phone: string;
  email: string;
  password: string;
  zip_code: string;
  state: string;
  city: string;
  address: string;
}

interface RegisterOrgUseCaseResponse {
  org: Org;
}

export class RegisterOrgUseCase {
  constructor(private orgsRepository: IOrgRepository) {}

  async execute({
    name,
    description,
    phone,
    email,
    password,
    zip_code,
    state,
    city,
    address,
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSameEmail) {
      throw new Error();
    }

    const password_hash = await hash(password, 6);

    const org = await this.orgsRepository.create({
      name,
      description,
      phone,
      email,
      password_hash,
      zip_code,
      state,
      city,
      address,
    });

    return { org };
  }
}
