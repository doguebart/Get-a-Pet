import { Pet, Prisma } from "@prisma/client";
import { IPetRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements IPetRepository {
  async update(id: string, data: Prisma.PetUpdateInput) {
    const pet = await prisma.pet.update({
      where: { id },
      data,
    });

    return pet;
  }

  async delete(id: string) {
    const pet = await prisma.pet.delete({
      where: {
        id,
      },
    });

    return pet;
  }

  async save(data: Pet) {
    const pet = await prisma.pet.update({
      where: { id: data.id },
      data,
    });

    return pet;
  }

  async listAllOrgPets(id: string, query?: string, page?: number) {
    const pets = await prisma.pet.findMany({
      where: {
        orgId: id,
        name: {
          contains: query ?? undefined,
        },
        adopted_at: null,
      },
      take: 12,
      skip: ((page ?? 1) - 1) * 12,
    });

    return pets;
  }

  async listAll(query?: string, page?: number) {
    const pets = await prisma.pet.findMany({
      where: {
        name: {
          contains: query ?? undefined,
        },
        adopted_at: null,
      },
      take: 12,
      skip: ((page ?? 1) - 1) * 12,
    });

    return pets;
  }

  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id },
    });

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }
}
