export interface IPublishArgs {
  messageId?: string;
  queue: string;
  message: Record<string, string>;
}

export interface ISubscribeArgs<T = unknown> {
  queue: string;
  callback: (data: T) => void;
}
