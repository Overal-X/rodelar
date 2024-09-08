import { Worker } from "bullmq";
import { Elysia, t } from "elysia";

import { MessageDto } from "./dto";
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_USERNAME } from "./env";
import { QueueService } from "./queue.service";
import { Action } from "./type";

const queueService = new QueueService({
  host: REDIS_HOST,
  port: REDIS_PORT,
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
});

const subscriptionPerConnection: Record<string, Worker> = {};

const app = new Elysia()
  .ws("/ws", {
    query: t.Object({
      apiKeyId: t.Optional(t.String()),
      apiKey: t.Optional(t.String()),
    }),
    body: MessageDto,
    open(ws) {
      console.log("connection from : ", ws.id);
    },
    close(ws) {
      console.log("disconnection from : ", ws.id);

      subscriptionPerConnection[ws.id]?.close();
      delete subscriptionPerConnection[ws.id];
    },
    async message(ws, message) {
      switch (message.action) {
        case Action.SUBSCRIBE:
          const subscription = queueService.subscribe({
            queue: message.event,
            callback: (data) => {
              ws.send({
                queue: message.event,
                action: message.action,
                message: data,
              });
            },
          });

          subscriptionPerConnection[ws.id.toString()] = subscription;

          break;
        case Action.PUBLISH:
          await queueService.publish({
            queue: message.event,
            message: message.payload,
          });

          break;
        default:
          throw new Error("action not supported");
      }
    },
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
