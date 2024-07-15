import { Prisma, Pet } from "@prisma/client";
import { IPetRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements IPetRepository {
  public items: Pet[] = [];

  async listAll() {
    return this.items;
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id);

    if (!pet) {
      return null;
    }

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: randomUUID(),
      orgId: data.orgId ?? null, // Ensure orgId is not undefined
      name: data.name,
      specie: data.specie,
      size: data.size,
      age: data.age,
      characteristics: Array.isArray(data.characteristics) // Ensure characteristics is an array of strings
        ? data.characteristics
        : [],
      adopted_at: data.adopted_at ? new Date(data.adopted_at) : null,
      created_at: new Date(),
    };

    this.items.push(pet);

    return pet;
  }
}
