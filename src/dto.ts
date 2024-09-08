import { t } from "elysia";

import { Action } from "./type";

export const MessageDto = t.Object({
  action: t.Enum(Action),
  event: t.String(),
  payload: t.Optional(t.Any()),
});
