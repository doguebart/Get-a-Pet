import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "../../repositories/in-memory/in-memory-pets-repository";
import { hash } from "bcryptjs";
import { GetPetByIdUseCase } from "./get-pet-by-id";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

let orgsRepository: InMemoryOrgsRepository;
let petsRepository: InMemoryPetsRepository;
let sut: GetPetByIdUseCase;

describe("Get Pet By Id Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository();
    sut = new GetPetByIdUseCase(petsRepository);
  });

  it("should be able to get a pet by id", async () => {
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

    const createdPetResponse = await petsRepository.create({
      orgId: org.id,
      name: "Calabreso",
      size: "SMALL",
      age: "ADULT",
      specie: "DOG",
      characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
    });

    const { pet } = await sut.execute({ petId: createdPetResponse.id });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet).toEqual(
      expect.objectContaining({
        characteristics: ["Leal", "Sociável", "Energético", "Obediente"],
      })
    );
  });

  it("should not be able to get a pet with wrong id", async () => {
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

    await expect(() =>
      sut.execute({ petId: "non-existing-id" })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
