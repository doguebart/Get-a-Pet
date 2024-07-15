import { FastifyReply, FastifyRequest } from "fastify";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { z } from "zod";
import { makeListAllOrgPetsUseCase } from "../../../use-cases/factories/pet/make-list-all-org-pets-use-case";

export const listAllOrgPets = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const listAllOrgPetsParamsSchema = z.object({
    orgId: z.string().uuid(),
  });

  const { orgId } = listAllOrgPetsParamsSchema.parse(request.params);

  try {
    const listAllOrgPets = makeListAllOrgPetsUseCase();

    const { pets } = await listAllOrgPets.execute({ orgId });

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
