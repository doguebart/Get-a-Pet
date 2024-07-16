import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { makeDeletePetByIdUseCase } from "../../../use-cases/factories/pet/make-delete-pet-use-case";

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
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
};
