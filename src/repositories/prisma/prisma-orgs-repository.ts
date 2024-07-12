import { Prisma } from "@prisma/client";
import { IOrgRepository } from "../orgs-repository";
import { prisma } from "../../lib/prisma";

export class PrismaOrgsRepository implements IOrgRepository {
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