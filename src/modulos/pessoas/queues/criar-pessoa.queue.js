import { createQueue } from "../../../utils/queue.js";

export const CRIAR_PESSOA_EVENT = 'criar-pessoa';

export const criarPessoaAsync = function(pessoa) {
  const queue = createQueue(CRIAR_PESSOA_EVENT);
  const jobName = `${CRIAR_PESSOA_EVENT}-${new Date().toISOString()}`;
  queue.add(jobName, pessoa);
}
