import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { makeListAllPetsUseCase } from "../../../use-cases/factories/pet/make-list-all-pets-use-case";

export const listAllPets = async (_: FastifyRequest, reply: FastifyReply) => {
  try {
    const listAllPets = makeListAllPetsUseCase();

    const { pets } = await listAllPets.execute();

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
