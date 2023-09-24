import { randomUUID } from "node:crypto";

import { Proteger } from "../../helpers/proteger.js";

export class CriarPessoaController {
  constructor({ pessoasRepository }) {
    this.pessoasRepository = pessoasRepository;
  }

  async handle(request, response) {
    try {
      const pessoa = request.body;
      const erro = await Proteger.contraPessoaInvalida(pessoa);
      if (erro?.status === "requisição inválida") {
        return response.status(422).json(erro);
      }
      if (erro?.status === "requisição sintaticamente inválida") {
        return response.status(400).json(erro);
      }
      const id = randomUUID();
      await this.pessoasRepository.cadastrar({ id, ...pessoa });
      response.setHeader("Location", `/pessoas/${id}`);
      response.status(201).json({ status: "pessoa criada com sucesso" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
