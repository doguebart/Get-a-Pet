import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { hash } from "bcryptjs";
import { ListPetsUseCase } from "./list-pets";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: ListPetsUseCase;

describe("List All Pets Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new ListPetsUseCase(petsRepository);
  });

  it("should be able to list all pets", async () => {
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
      size: "SMALL",
      age: "ADULT",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    await petsRepository.create({
      orgId: org.id,
      name: "Mussarelo",
      size: "LARGE",
      age: "ADULT",
      specie: "CAT",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    const { pets } = await sut.execute();

    expect(pets).toEqual(expect.any(Array));
    expect(pets).length(2);
  });
});
