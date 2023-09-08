import { randomUUID } from "node:crypto";

import { IORedisCliente } from "../../utils/ioredisClient.js";
import { criarPessoaAsync } from "./queues/criar-pessoa.queue.js";

export class CriarPessoaController {
  constructor({ proteger }) {
    this.proteger = proteger;
  }

  async handle(request, response) {
    try {
      const pessoa = request.body;
      const erro = await this.proteger.contraPessoaInvalida(pessoa);
      if (erro?.status === "requisição inválida") {
        return response.status(422).json(erro);
      }
      if (erro?.status === "requisição sintaticamente inválida") {
        return response.status(400).json(erro);
      }
      const pessoaID = randomUUID();
      IORedisCliente.set(pessoaID, { id: pessoaID, ...pessoa });
      criarPessoaAsync({ id: pessoaID, ...pessoa });
      response.setHeader("Location", `/pessoas/${pessoaID}`);
      response.status(201).json({ status: "pessoa criada com sucesso" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
