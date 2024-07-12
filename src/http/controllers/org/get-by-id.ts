import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeGetOrgByIdUseCase } from "../../../use-cases/factories/org/make-get-org-by-id-use-case";

export const getOrgById = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getOrgByIdBodySchema = z.object({
    orgId: z.string().uuid(),
  });

  const { orgId } = getOrgByIdBodySchema.parse(request.params);

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
};
