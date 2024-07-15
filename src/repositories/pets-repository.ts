import { Pet, Prisma } from "@prisma/client";

export interface IPetRepository {
  listAllOrgPets(id: string): Promise<Pet[] | null>;
  listAll(): Promise<Pet[] | null>;
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
