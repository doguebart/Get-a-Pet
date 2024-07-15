import { Pet, Prisma } from "@prisma/client";

export interface IPetRepository {
  findById(id: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
