import type { FastifyInstance } from "fastify";
import { ZodError } from "zod";

import { BadRequestError } from "./errors/bad-request-error";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: "Validation error",
      errors: error.flatten().fieldErrors,
    });
  }

  if (error instanceof BadRequestError) {
    reply.status(400).send({
      message: error.message,
    });
  }

  // send error to some observability platform

  reply.status(500).send({ message: "Internal server error" });
};
