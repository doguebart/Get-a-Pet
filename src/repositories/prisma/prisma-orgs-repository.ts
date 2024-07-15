import { Prisma } from "@prisma/client";
import { IOrgRepository } from "../orgs-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOrgsRepository implements IOrgRepository {
  async update(id: string, data: Prisma.OrgUpdateInput) {
    const org = await prisma.org.update({
      where: { id },
      data,
    });

    return org;
  }

  async delete(id: string) {
    const org = await prisma.org.delete({
      where: { id },
    });

    return org;
  }

  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: { id },
    });

    return org;
  }

  async findByPhone(phone: string) {
    const org = await prisma.org.findUnique({
      where: { phone },
    });

    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: { email },
    });

    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    });

    return org;
  }
}
