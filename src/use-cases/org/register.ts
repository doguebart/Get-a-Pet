import { Org } from "@prisma/client";
import { IOrgRepository } from "../../repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgPhoneAlreadyExists } from "../errors/org-phone-already-exists-error";
import { OrgEmailAlreadyExists } from "../errors/org-email-already-exists-error";

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
    const orgWithSamePhone = await this.orgsRepository.findByPhone(phone);
    const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

    if (orgWithSamePhone) {
      throw new OrgPhoneAlreadyExists();
    }

    if (orgWithSameEmail) {
      throw new OrgEmailAlreadyExists();
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
