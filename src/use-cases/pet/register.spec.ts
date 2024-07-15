import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { RegisterPetUseCase } from "./register";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { hash } from "bcryptjs";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: RegisterPetUseCase;

describe("Register Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new RegisterPetUseCase(petsRepository, orgsRepository);
  });

  it("should be able to register a pet", async () => {
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

    const { pet } = await sut.execute({
      orgId: org.id,
      name: "Calabreso",
      size: "SMALL",
      age: "ADULT",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet).toEqual(
      expect.objectContaining({
        name: "Calabreso",
      })
    );
  });
});
