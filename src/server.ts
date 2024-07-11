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
import { confirmParticipants } from "./routes/confirm-participant";
import { createActivity } from "./routes/create-activity";
import { getActivities } from "./routes/get-activities";
import { createLink } from "./routes/create-link";
import { getLinks } from "./routes/get-links";
import { getParticipants } from "./routes/get-participants";
import { createInvite } from "./routes/create-invite";
import { updateTrip } from "./routes/update-trip";
import { getTripDetails } from "./routes/get-trip-details";
import { getParticipant } from "./routes/get-participant";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(cors, {
  origin: "*",
});

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.setErrorHandler(errorHandler);

app.register(createTrip);
app.register(createActivity);
app.register(createLink);
app.register(createInvite);
app.register(confirmTrip);
app.register(confirmParticipants);
app.register(getActivities);
app.register(getLinks);
app.register(getParticipant);
app.register(getParticipants);
app.register(getTripDetails);
app.register(updateTrip);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server running!🚀🚀");
});
