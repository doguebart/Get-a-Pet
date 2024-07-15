import { Pet, Prisma } from "@prisma/client";
import { IPetRepository } from "../pets-repository";
import { prisma } from "../../lib/prisma";

export class PrismaPetsRepository implements IPetRepository {
  async listAllOrgPets(id: string): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany({
      where: { orgId: id },
    });

    return pets;
  }

  async listAll(): Promise<Pet[] | null> {
    const pets = await prisma.pet.findMany();

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
