import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { makeSetPetAdoptedUseCase } from "../../../use-cases/factories/pet/make-set-pet-adopted-use-case";
import { UnauthorizedError } from "../../../use-cases/errors/unauthorized-error";

export const setPetAdopted = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const setPetAdoptedParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = setPetAdoptedParamsSchema.parse(request.params);

  try {
    const setPetAdoptedUseCase = makeSetPetAdoptedUseCase();

    await setPetAdoptedUseCase.execute({
      petId,
      orgId: request.user.sub,
    });

    return reply.status(204).send();
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    if (err instanceof UnauthorizedError) {
      return reply.status(401).send({ message: err.message });
    }

    throw err;
  }
};
