import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { ResourceNotFoundError } from "../../../use-cases/errors/resource-not-found-error";
import { makeUpdateOrgUseCase } from "../../../use-cases/factories/org/make-update-org-use-case";

export const updateOrg = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const getOrgByIdBodySchema = z.object({
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
  const { orgId } = getOrgByIdBodySchema.parse(request.params);

  const { name, description, zip_code, state, city, address } =
    deleteOrgBodySchema.parse(request.body);

  if (orgId !== request.user.sub) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  try {
    const updateOrgUseCase = makeUpdateOrgUseCase();

    await updateOrgUseCase.execute({
      orgId: request.user.sub,
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
