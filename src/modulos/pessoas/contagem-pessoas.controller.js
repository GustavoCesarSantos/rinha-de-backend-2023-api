export class ContagemPessoasController {
  constructor({ pessoasRepository }) {
    this.pessoasRepository = pessoasRepository;
  }

  async handle(request, response) {
    try {
      const contagem = await this.pessoasRepository.contagem();
      response.status(200).json({ contagem });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
