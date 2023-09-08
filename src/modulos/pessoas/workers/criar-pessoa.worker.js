import { createWorker } from "../../../utils/worker.js";
import { CriarPessoaService } from "../criar-pessoa.service.js";
import { CRIAR_PESSOA_EVENT } from "../queues/criar-pessoa.queue.js";

const worker = createWorker(CRIAR_PESSOA_EVENT, async (job) => {
  const pessoasRepository = new PessoasRepository();
  const criarPessoaService = new CriarPessoaService(pessoasRepository);
  await criarPessoaService.execute(job.data);
});

worker.on("completed", (job, returnValue) => {
  console.log("job completed");
});
