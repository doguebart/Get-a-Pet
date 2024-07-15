import { Pet, Prisma } from "@prisma/client";

export interface IPetRepository {
  listAll(): Promise<Pet[] | null>;
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
