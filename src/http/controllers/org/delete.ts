import { FastifyReply, FastifyRequest } from "fastify";
import { makeDeleteOrgUseCase } from "../../../use-cases/factories/org/make-delete-org-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { z } from "zod";

export const deleteOrg = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getOrgByIdBodySchema = z.object({
    orgId: z.string().uuid(),
  });

  const { orgId } = getOrgByIdBodySchema.parse(request.params);

  if (orgId !== request.user.sub) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  try {
    const deleteOrgUseCase = makeDeleteOrgUseCase();

    await deleteOrgUseCase.execute({
      orgId: request.user.sub,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
};
