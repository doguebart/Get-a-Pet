import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { GetOrgByIdUseCase } from "./get-by-id";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: GetOrgByIdUseCase;

describe("Get Org By Id Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgByIdUseCase(orgsRepository);
  });

  it("should be able to get a org by id", async () => {
    const createdOrg = await orgsRepository.create({
      name: "getApet",
      description: "Some description",
      phone: "11940028922",
      email: "getapet@gmail.com",
      password_hash: await hash("123456", 6),
      zip_code: "06145-096",
      state: "São Paulo",
      city: "Osasco",
      address: "Rua Mirante Salazar, 812",
    });

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    });

    expect(org.name).toEqual("getApet");
  });

  it("should not be able to get a org with wrong id", async () => {
    await orgsRepository.create({
      name: "getApet",
      description: "Some description",
      phone: "11940028922",
      email: "getapet@gmail.com",
      password_hash: await hash("123456", 6),
      zip_code: "06145-096",
      state: "São Paulo",
      city: "Osasco",
      address: "Rua Mirante Salazar, 812",
    });

    await expect(() =>
      sut.execute({
        orgId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
