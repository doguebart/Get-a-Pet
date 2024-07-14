import { Org, Prisma } from "@prisma/client";

export interface IOrgRepository {
  update(id: string, data: Prisma.OrgUpdateInput): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findByPhone(phone: string): Promise<Org | null>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}
