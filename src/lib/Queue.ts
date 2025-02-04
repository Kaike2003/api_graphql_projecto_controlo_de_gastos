import Queue, { Job } from "bull";
import { IQueue } from "../utils/queue/queue";
import EmailCreateAccount from "../jobs/mail/emailCreateAccount";
import { IEmailCreateAccount } from "../utils/queue/mail/mail";

const jobs = [EmailCreateAccount.build()];

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.getKey(), "redis://127.0.0.1:6379", {
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
    },
  }),
  name: job.getKey(),
  handle: job.handle,
}));

export default class Queues {
  private constructor() {}

  public static create() {
    return new Queues();
  }

  public async add<T>(name: string, data: IQueue<T>) {
    const queue = queues.find((queue) => queue.name === name);
    return queue?.bull.add(data);
  }

  public async process() {
    return queues.forEach((queue) => {
      queue.bull.process((job: Job<IQueue<IEmailCreateAccount>>) => queue.handle(job.data.data));

      queue.bull.on("completed", (job) => {
        console.log(`Job ${job.id} concluído com sucesso!`);
      });

      queue.bull.on("progress", (job) => {
        console.log(`Job ${job.id} em progresso!`, job.data);
      });

      queue.bull.on("failed", (job, err) => {
        console.log("Job failed", queue.name, job.data);
        console.log(err);
      });
    });
  }
}
