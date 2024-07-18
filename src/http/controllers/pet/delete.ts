import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { makeDeletePetByIdUseCase } from "../../../use-cases/factories/pet/make-delete-pet-use-case";
import { UnauthorizedError } from "../../../use-cases/errors/unauthorized-error";

export const deleteById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const deletePetByIdParamsSchema = z.object({
    petId: z.string().uuid(),
  });

  const { petId } = deletePetByIdParamsSchema.parse(request.params);

  try {
    const deletePetByIdUseCase = makeDeletePetByIdUseCase();

    await deletePetByIdUseCase.execute({
      petId,
      orgId: request.user.sub,
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
