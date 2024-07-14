import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { UpdateOrgUseCase } from "./update";

let orgsRepository: InMemoryOrgsRepository;
let sut: UpdateOrgUseCase;

describe("Update Org By Id Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new UpdateOrgUseCase(orgsRepository);
  });

  it("should be able to update a org by id", async () => {
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
      name: "getApet",
      description: "Some description Updated",
      zip_code: "06145-096",
      state: "São Paulo",
      city: "Osasco",
      address: "Rua Mirante Salazar, 900",
    });

    const org = await orgsRepository.findById(createdOrg.id);

    expect(org).toEqual(
      expect.objectContaining({
        description: "Some description Updated",
      })
    );
  });

  it("should not be able to update a org with wrong id", async () => {
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
        name: "getApet",
        description: "Some description Updated",
        zip_code: "06145-096",
        state: "São Paulo",
        city: "Osasco",
        address: "Rua Mirante Salazar, 900",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
