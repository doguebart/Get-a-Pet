import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { orgsRoutes } from "./http/controllers/org/routes";
import { petRoutes } from "./http/controllers/pet/routes";

export const app = fastify();

app.register(orgsRoutes);
app.register(petRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Validation error.",
      issues: error.format(),
    });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({
    message: "Internal server error.",
  });
});
