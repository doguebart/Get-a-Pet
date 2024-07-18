import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterPetUseCase } from "../../../use-cases/factories/pet/make-register-pet-use-case";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerPetBodySchema = z.object({
    name: z.string().min(3),
    specie: z.enum(["DOG", "CAT"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    age: z.enum(["PUPPY", "ADULT"]),
    characteristics: z.string().array(),
  });

  const { name, specie, size, age, characteristics } =
    registerPetBodySchema.parse(request.body);

  const registerUseCase = makeRegisterPetUseCase();

  await registerUseCase.execute({
    orgId: request.user.sub,
    name,
    specie,
    size,
    age,
    characteristics,
  });

  return reply.status(201).send();
};
