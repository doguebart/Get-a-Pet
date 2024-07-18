import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { ListAllOrgPetsUseCase } from "./list-all-org-pets";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: ListAllOrgPetsUseCase;

describe("List All Org Pets Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new ListAllOrgPetsUseCase(petsRepository, orgsRepository);
  });

  it("should be able to list all org pets", async () => {
    const create_first_org = await orgsRepository.create({
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

    await petsRepository.create({
      orgId: create_first_org.id,
      name: "Calabreso",
      size: "SMALL",
      age: "ADULT",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    await petsRepository.create({
      orgId: create_first_org.id,
      name: "Mussarelo",
      size: "LARGE",
      age: "ADULT",
      specie: "CAT",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    const create_second_org = await orgsRepository.create({
      name: "AdotPet",
      description: "Some description",
      phone: "11940028922",
      email: "getapet@gmail.com",
      password_hash: await hash("123456", 6),
      zip_code: "06145-096",
      state: "São Paulo",
      city: "Osasco",
      address: "Rua Mirante Salazar, 812",
    });

    await petsRepository.create({
      orgId: create_second_org.id,
      name: "Honey",
      size: "MEDIUM",
      age: "PUPPY",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    const { pets } = await sut.execute({ orgId: create_first_org.id });

    expect(pets).toEqual(expect.any(Array));
    expect(pets).length(2);
  });

  it("should not be able to list all org pets with wrong org id", async () => {
    const create_first_org = await orgsRepository.create({
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

    await petsRepository.create({
      orgId: create_first_org.id,
      name: "Calabreso",
      size: "SMALL",
      age: "ADULT",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    await petsRepository.create({
      orgId: create_first_org.id,
      name: "Mussarelo",
      size: "LARGE",
      age: "ADULT",
      specie: "CAT",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    const create_second_org = await orgsRepository.create({
      name: "AdotPet",
      description: "Some description",
      phone: "11940028922",
      email: "getapet@gmail.com",
      password_hash: await hash("123456", 6),
      zip_code: "06145-096",
      state: "São Paulo",
      city: "Osasco",
      address: "Rua Mirante Salazar, 812",
    });

    await petsRepository.create({
      orgId: create_second_org.id,
      name: "Honey",
      size: "MEDIUM",
      age: "PUPPY",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    await expect(() =>
      sut.execute({ orgId: "non-existing-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should be able to search a org pet by name", async () => {
    const org = await orgsRepository.create({
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

    await petsRepository.create({
      orgId: org.id,
      name: "Calabreso",
      size: "MEDIUM",
      age: "PUPPY",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    await petsRepository.create({
      orgId: org.id,
      name: "Mussarelo",
      size: "SMALL",
      age: "ADULT",
      specie: "CAT",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    const { pets } = await sut.execute({
      orgId: org.id,
      page: 1,
      query: "Calabreso",
    });

    expect(pets).toEqual(expect.any(Array));
    expect(pets).toHaveLength(1);
    expect(pets).toEqual([
      expect.objectContaining({
        name: "Calabreso",
      }),
    ]);
  });
});
