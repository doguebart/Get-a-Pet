import { describe, beforeEach, it, expect } from "vitest";
import { InMemoryOrgsRepository } from "../../repositories/in-memory/in-memory-orgs-repository";
import { RegisterOrgUseCase } from "./register";
import { compare } from "bcryptjs";
import { OrgEmailAlreadyExists } from "../errors/org-email-already-exists-error";
import { OrgPhoneAlreadyExists } from "../errors/org-phone-already-exists-error";

let orgsRepository: InMemoryOrgsRepository;
let sut: RegisterOrgUseCase;

describe("Register Org Use Case", () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new RegisterOrgUseCase(orgsRepository);
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
      phone: "11941028922",
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
    ).rejects.toBeInstanceOf(OrgEmailAlreadyExists);
  });

  it("should not be able to register with same phone", async () => {
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
        email: "getapet2@gmail.com",
        password: "123456",
        zip_code: "06145-096",
        state: "São Paulo",
        city: "Osasco",
        address: "Rua Mirante Salazar, 812",
      })
    ).rejects.toBeInstanceOf(OrgPhoneAlreadyExists);
  });
});
