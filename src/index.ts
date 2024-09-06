import { Elysia, t } from "elysia";

import { QueueService } from "./queue.service";

enum Action {
  SUBSCRIBE = "SUBSCRIBE",
  PUBLISH = "PUBLISH",
}

const MessageDto = t.Object({
  action: t.Enum(Action),
  event: t.String(),
  payload: t.Optional(t.Any()),
});

const queueService = new QueueService({
  host: "localhost",
  port: 6379,
  // username: "user",
  // password: "password",
});

const app = new Elysia()
  .ws("/ws", {
    headers: t.Object({ authorization: t.String() }),
    body: MessageDto,
    open(ws) {
      console.log("connection from : ", ws.id);
    },
    close(ws) {
      console.log("disconnection from : ", ws.id);
    },
    async message(ws, message) {
      switch (message.action) {
        case Action.SUBSCRIBE:
          queueService.subscribe({
            queue: message.event,
            callback: ws.send,
          });
          break;
        case Action.PUBLISH:
          const messageId = crypto.randomUUID();

          await queueService.publish({
            queue: message.event,
            message: message.payload,
            messageId,
          });

          ws.send({ messageId });
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
