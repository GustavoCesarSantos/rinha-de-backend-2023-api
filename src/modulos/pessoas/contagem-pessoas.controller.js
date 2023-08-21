export class ContagemPessoasController {
  constructor({ contagemPessoasService }) {
    this.contagemPessoasService = contagemPessoasService;
  }

  async handle(request, response) {
    try {
      const contagem = await this.contagemPessoasService.execute();
      response.status(200).json({ contagem });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
