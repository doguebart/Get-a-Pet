import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { makeUpdateOrgUseCase } from "../../../use-cases/factories/org/make-update-org-use-case";

export const updateOrg = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const deleteOrgParamsSchema = z.object({
    orgId: z.string().uuid(),
  });

  const deleteOrgBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    zip_code: z.string(),
    state: z.string(),
    city: z.string(),
    address: z.string(),
  });

  const { orgId } = deleteOrgParamsSchema.parse(request.params);
  const { name, description, zip_code, state, city, address } =
    deleteOrgBodySchema.parse(request.body);

  try {
    const updateOrgUseCase = makeUpdateOrgUseCase();

    await updateOrgUseCase.execute({
      orgId,
      name,
      description,
      zip_code,
      state,
      city,
      address,
    });
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message });
    }

    throw err;
  }

  return reply.status(204).send();
};
