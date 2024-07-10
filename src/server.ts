import fastify from "fastify";
import cors from "@fastify/cors";
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { createTrip } from "./routes/create-trip";
import { confirmTrip } from "./routes/confirm-trip";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(cors, {
  origin: "*",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(createTrip);
app.register(confirmTrip);

app.listen({ port: 3333 }).then(() => {
  console.log("Server running!");
});
