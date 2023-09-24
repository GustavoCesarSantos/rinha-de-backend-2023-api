export class EncontrarPessoasController {
  constructor({ pessoasRepository }) {
    this.pessoasRepository = pessoasRepository;
  }

  async handle(request, response) {
    try {
      const { t } = request.query;
      if (!t) {
        return response.status(400).json({
          status: "requisição inválida",
          mensagem: "query string não enviada",
          caminho: "request.query.t",
          recebido: "undefined",
          esperado: "string",
        });
      }
      const pessoas = await this.pessoasRepository.encontrarPessoas(t);
      response.status(200).json(pessoas);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
