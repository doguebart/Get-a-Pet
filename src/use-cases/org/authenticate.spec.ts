import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { hash } from "bcryptjs";
import { AuthenticateOrgUseCase } from "./authenticate";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: AuthenticateOrgUseCase;

describe("Authenticate Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new AuthenticateOrgUseCase(orgsRepository);
  });

  it("should be able to authenticate a org", async () => {
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

    const { org } = await sut.execute({
      email: "getapet@gmail.com",
      password: "123456",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("should not be able to authenticate with wrong e-mail.", async () => {
    await expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able to authenticate with wrong password.", async () => {
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
        email: "getapet@gmail.com",
        password: "111111",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
