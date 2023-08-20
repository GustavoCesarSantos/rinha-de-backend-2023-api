export class EncontrarPessoaController {
  constructor({ encontrarPessoaPeloIdService }) {
    this.encontrarPessoaPeloIdService = encontrarPessoaPeloIdService;
  }

  async handle(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(422).json({
          status: "requisição inválida",
          mensagem: "parametro id não informado",
          caminho: "request.params",
          recebido: "undefined",
          esperado: "string",
        });
      }
      if (typeof id !== "string") {
        return response.status(400).json({
          status: "requisição sintaticamente inválida",
          mensagem: "id tipo invalido",
          caminho: "request.params.id",
          recebido: `${typeof id}`,
          esperado: "string",
        });
      }
      const pessoa = await this.encontrarPessoaPeloIdService.execute(id);
      if (!pessoa) {
        return response.status(404).json({ status: "pessoa não encontrada" });
      }
      response.status(200).json(pessoa);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
