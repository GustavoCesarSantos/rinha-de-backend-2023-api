import { IORedisCliente } from "../../utils/ioredisClient.js";
import { criarPessoaAsync } from "./queues/criar-pessoa.queue.js";

export class CriarPessoaController {
  constructor({ proteger, criarPessoaService }) {
    this.proteger = proteger;
    this.criarPessoaService = criarPessoaService;
  }

  async handle(request, response) {
    try {
      const pessoa = request.body;
      IORedisCliente.set('t', 'teste');
      const result = await IORedisCliente.get('t');
      console.info('RESULT CACHE', result);
      criarPessoaAsync('teste de criação de pessoa controller');
      const erro = await this.proteger.contraPessoaInvalida(pessoa);
      if (erro?.status === "requisição inválida") {
        return response.status(422).json(erro);
      }
      if (erro?.status === "requisição sintaticamente inválida") {
        return response.status(400).json(erro);
      }
      const pessoaID = await this.criarPessoaService.execute(pessoa);
      response.setHeader("Location", `/pessoas/${pessoaID}`);
      response.status(201).json({ status: "pessoa criada com sucesso" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
