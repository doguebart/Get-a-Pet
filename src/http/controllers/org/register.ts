import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "../../../use-cases/factories/org/make-register-use-case";
import { UserAlreadyExistsError } from "../../../use-cases/errors/user-already-exists-error";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const registerOrgBodySchema = z.object({
    name: z.string().min(3),
    description: z.string().min(100),
    phone: z.string().min(11).max(11),
    email: z.string().email(),
    password: z.string().min(6),
    zip_code: z.string(),
    state: z.string(),
    city: z.string(),
    address: z.string(),
  });

  const {
    name,
    description,
    phone,
    email,
    password,
    zip_code,
    state,
    city,
    address,
  } = registerOrgBodySchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();

    await registerUseCase.execute({
      name,
      description,
      phone,
      email,
      password,
      zip_code,
      state,
      city,
      address,
    });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(201).send();
};
