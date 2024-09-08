import { ConnectionOptions, Job, Queue, Worker } from "bullmq";

import { IPublishArgs, ISubscribeArgs } from "./queue.type";

export class QueueService {
  constructor(private connection: ConnectionOptions) {}

  async publish(args: IPublishArgs) {
    return await new Queue(args.queue, { connection: this.connection }).add(
      crypto.randomUUID(),
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
