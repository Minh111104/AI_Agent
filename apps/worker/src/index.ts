import "dotenv/config";
import { Queue, Worker } from "bullmq";
import cron from "node-cron";
import pino from "pino";
import { env } from "@shared/env";
import { createRedisClient } from "@shared/db/clients";

const logger = pino({ level: env.LOG_LEVEL ?? "info" });
const connection = createRedisClient();

// Queues
export const scoutQueue = new Queue("scout", { connection });
export const normalizeQueue = new Queue("normalize", { connection });
export const fitScoreQueue = new Queue("fit-score", { connection });
export const materialsQueue = new Queue("materials", { connection });
export const complianceQueue = new Queue("compliance", { connection });

// Cron: run scout every 6 hours
cron.schedule("0 */6 * * *", async () => {
  await scoutQueue.add("run-scout", {});
  logger.info("Enqueued scout run");
});

// Worker stubs
new Worker(
  "scout",
  async (job) => {
    logger.info({ jobId: job.id }, "[scout] fetch and extract job boards (stub)");
  },
  { connection }
);

new Worker(
  "normalize",
  async (job) => {
    logger.info({ jobId: job.id }, "[normalize] dedupe + normalize titles (stub)");
  },
  { connection }
);

new Worker(
  "fit-score",
  async (job) => {
    logger.info({ jobId: job.id }, "[fit-score] compute fit score (stub)");
  },
  { connection }
);

new Worker(
  "materials",
  async (job) => {
    logger.info({ jobId: job.id }, "[materials] draft answers using KB evidence (stub)");
  },
  { connection }
);

new Worker(
  "compliance",
  async (job) => {
    logger.info({ jobId: job.id }, "[compliance] fact-check drafts (stub)");
  },
  { connection }
);

logger.info("worker service bootstrapped");
