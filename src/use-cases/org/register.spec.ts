import { describe, beforeEach, afterEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { RegisterOrgUseCase } from "./register";
import { compare } from "bcryptjs";

let orgsRegisterRepository: InMemoryOrgsRepository;
let sut: RegisterOrgUseCase;

describe("Register Org Use Case", () => {
  beforeEach(() => {
    orgsRegisterRepository = new InMemoryOrgsRepository();
    sut = new RegisterOrgUseCase(orgsRegisterRepository);
  });

  it("should be able to register a org", async () => {
    const { org } = await sut.execute({
      name: "getApet",
      description: "Some description",
      phone: "11940028922",
      email: "getapet@gmail.com",
      password: "123456",
      zip_code: "06145-096",
      state: "São Paulo",
      city: "Osasco",
      address: "Rua Mirante Salazar, 812",
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org).toEqual(
      expect.objectContaining({
        email: "getapet@gmail.com",
      })
    );
  });

  it("should be able to hash org password", async () => {
    const { org } = await sut.execute({
      name: "getApet",
      description: "Some description",
      phone: "11940028922",
      email: "getapet@gmail.com",
      password: "123456",
      zip_code: "06145-096",
      state: "São Paulo",
      city: "Osasco",
      address: "Rua Mirante Salazar, 812",
    });

    const isPasswordCorrectlyHashed = await compare(
      "123456",
      org.password_hash
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to register with same email", async () => {
    await sut.execute({
      name: "getApet",
      description: "Some description",
      phone: "11940028922",
      email: "getapet@gmail.com",
      password: "123456",
      zip_code: "06145-096",
      state: "São Paulo",
      city: "Osasco",
      address: "Rua Mirante Salazar, 812",
    });

    await expect(() =>
      sut.execute({
        name: "getApet",
        description: "Some description",
        phone: "11940028922",
        email: "getapet@gmail.com",
        password: "123456",
        zip_code: "06145-096",
        state: "São Paulo",
        city: "Osasco",
        address: "Rua Mirante Salazar, 812",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
