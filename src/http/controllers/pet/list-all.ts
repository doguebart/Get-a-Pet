import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { makeListAllPetsUseCase } from "../../../use-cases/factories/pet/make-list-all-pets-use-case";
import { z } from "zod";

export const listAllPets = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const searchPetsQuerySchema = z.object({
    query: z.string().optional(),
    page: z.coerce.number().min(1).default(1).optional(),
  });

  const { query, page } = searchPetsQuerySchema.parse(request.query);

  try {
    const listAllPets = makeListAllPetsUseCase();

    const { pets } = await listAllPets.execute({ query, page });

    return reply.status(200).send({
      pets,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
};
