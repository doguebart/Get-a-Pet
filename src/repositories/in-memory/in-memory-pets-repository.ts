import { Prisma, Pet } from "@prisma/client";
import { IPetRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetsRepository implements IPetRepository {
  public items: Pet[] = [];

  async update(id: string, data: Prisma.PetUpdateInput) {
    const pet = this.items.findIndex((item) => item.id === id);

    if (pet === -1) {
      return null;
    }

    const updatedpet = { ...this.items[pet], ...data };
    return (this.items[pet] = updatedpet as Pet);
  }

  async delete(id: string) {
    const pet = this.items.findIndex((item) => item.id === id);

    if (pet === -1) {
      return null;
    }

    return this.items.splice(pet, 1)[0];
  }

  async save(pet: Pet) {
    const petIndex = this.items.findIndex((item) => item.id === pet.id);

    if (petIndex >= 0) {
      this.items[petIndex] = pet;
    }

    return pet;
  }

  async listAllOrgPets(id: string) {
    return this.items.filter((item) => item.orgId === id);
  }

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
