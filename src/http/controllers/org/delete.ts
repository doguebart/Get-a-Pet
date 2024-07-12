import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeDeleteOrgUseCase } from "../../../use-cases/factories/org/make-delete-org-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export const deleteOrg = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const deleteBodySchema = z.object({
    orgId: z.string().uuid(),
  });

  const { orgId } = deleteBodySchema.parse(request.params);

  try {
    const deleteOrgUseCase = makeDeleteOrgUseCase();

    await deleteOrgUseCase.execute({
      orgId,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
};
