import { ConnectionOptions, Job, Queue, Worker } from "bullmq";

interface IPublishArgs {
  messageId?: string;
  queue: string;
  message: Record<string, string>;
}

interface ISubscribeArgs<T = unknown> {
  queue: string;
  callback: (data: T) => void;
}

export class QueueService {
  constructor(private connection: ConnectionOptions) {}

  async publish(args: IPublishArgs) {
    return await new Queue(args.queue, { connection: this.connection }).add(
      args.messageId || "no-msg-id",
      args.message
    );
  }

  subscribe<T = any>(args: ISubscribeArgs<T>) {
    return new Worker(
      args.queue,
      async (job: Job<T>) => args.callback(job.data),
      {
        connection: this.connection,
      }
    );
  }
}
