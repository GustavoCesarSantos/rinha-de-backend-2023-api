export class EncontrarPessoasController {
  constructor({ encontrarPessoasService }) {
    this.encontrarPessoasService = encontrarPessoasService;
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
      const query = t.replaceAll(/'/gi, "").replaceAll(/"/g, "");
      if (query === "") {
        return response.status(400).json({
          status: "requisição inválida",
          mensagem: "query string não enviada",
          caminho: "request.query.t",
          recebido: "undefined",
          esperado: "string",
        });
      }
      const pessoas = await this.encontrarPessoasService.execute(query);
      response.status(200).json(pessoas);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
