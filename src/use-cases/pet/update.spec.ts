import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { UpdatePetUseCase } from "./update";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: UpdatePetUseCase;

describe("Update Pet By Id Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new UpdatePetUseCase(petsRepository);
  });

  it("should be able to update a pet by id", async () => {
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

    const createdPet = await petsRepository.create({
      orgId: createdOrg.id,
      name: "Calabreso",
      size: "SMALL",
      age: "ADULT",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    await sut.execute({
      petId: createdPet.id,
      name: "Haxixe",
      size: "SMALL",
      age: "ADULT",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    const pet = await petsRepository.findById(createdPet.id);

    expect(pet).toEqual(
      expect.objectContaining({
        name: "Haxixe",
      })
    );
  });

  it("should not be able to update a pet with wrong id", async () => {
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
        petId: "non-existing-id",
        name: "Haxixe",
        size: "SMALL",
        age: "ADULT",
        specie: "DOG",
        characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
