import { Prisma, Org } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { IOrgRepository } from "../orgs-repository";
import { ResourceNotFoundError } from "../../use-cases/errors/resource-not-found-error";

export class InMemoryOrgsRepository implements IOrgRepository {
  public items: Org[] = [];

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByPhone(phone: string) {
    const org = this.items.find((item) => item.phone === phone);

    if (!org) {
      return null;
    }

    return org;
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email);

    if (!org) {
      return null;
    }

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      phone: data.phone,
      email: data.email,
      password_hash: data.password_hash,
      zip_code: data.zip_code,
      state: data.state,
      city: data.city,
      address: data.address,
      created_at: new Date(),
    };

    this.items.push(org);

    return org;
  }
}
