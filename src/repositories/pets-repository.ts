import { Pet, Prisma } from "@prisma/client";

export interface IPetRepository {
  save(pet: Pet): Promise<Pet>;
  listAllOrgPets(id: string): Promise<Pet[] | null>;
  listAll(): Promise<Pet[] | null>;
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
