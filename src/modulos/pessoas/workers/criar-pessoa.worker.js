import { createWorker } from "../../../utils/worker.js";
import { CRIAR_PESSOA_EVENT } from "../queues/criar-pessoa.queue.js";

const worker = createWorker(CRIAR_PESSOA_EVENT, async (job) => console.log(job.data));
worker.on('completed', (job, returnValue) => {
  console.log('job completed');
})
