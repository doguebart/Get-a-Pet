import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { DeleteOrgUseCase } from "./delete";

let orgsRepository: InMemoryOrgsRepository;
let sut: DeleteOrgUseCase;

describe("Delete Org By Id Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new DeleteOrgUseCase(orgsRepository);
  });

  it("should be able to delete a org by id", async () => {
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

    await sut.execute({
      orgId: createdOrg.id,
    });

    const org = await orgsRepository.findById(createdOrg.id);

    expect(org).toBeNull();
  });

  it("should not be able to delete a org with wrong id", async () => {
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
