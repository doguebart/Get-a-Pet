import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetOrgByIdUseCase } from "../../../use-cases/factories/org/make-get-org-by-id-use-case";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";

export const getOrgById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getOrgByIdBodySchema = z.object({
    orgId: z.string().uuid(),
  });

  const { orgId } = getOrgByIdBodySchema.parse(request.params);

  try {
    const getOrgByIdUseCase = makeGetOrgByIdUseCase();

    const { org } = await getOrgByIdUseCase.execute({
      orgId,
    });

    return reply.status(200).send({
      org: {
        ...org,
        password_hash: undefined,
      },
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }
};
