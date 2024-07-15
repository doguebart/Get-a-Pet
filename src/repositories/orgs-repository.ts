import { Org, Prisma } from "@prisma/client";

export interface IOrgRepository {
  update(id: string, data: Prisma.OrgUpdateInput): Promise<Org | null>;
  delete(id: string): Promise<Org | null>;
  findById(id: string): Promise<Org | null>;
  findByEmail(email: string): Promise<Org | null>;
  findByPhone(phone: string): Promise<Org | null>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}
