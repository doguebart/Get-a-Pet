import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeUpdatePetUseCase } from "../../../use-cases/factories/pet/make-update-pet-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { UnauthorizedError } from "../../../use-cases/errors/unauthorized-error";

export const update = async (request: FastifyRequest, reply: FastifyReply) => {
  const updatePetParamsSchema = z.object({
    petId: z.string().uuid(),
  });
  const updatePetBodySchema = z.object({
    name: z.string().min(3),
    specie: z.enum(["DOG", "CAT"]),
    size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
    age: z.enum(["PUPPY", "ADULT"]),
    characteristics: z.string().array(),
  });

  const { petId } = updatePetParamsSchema.parse(request.params);

  const { name, specie, size, age, characteristics } =
    updatePetBodySchema.parse(request.body);

  try {
    const updatePetUseCase = makeUpdatePetUseCase();

    await updatePetUseCase.execute({
      orgId: request.user.sub,
      petId,
      name,
      specie,
      size,
      age,
      characteristics,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof UnauthorizedError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
};
