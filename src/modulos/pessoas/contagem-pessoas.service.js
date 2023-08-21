export class ContagemPessoasService {
  constructor(pessoasRepository) {
    this.pessoasRepository = pessoasRepository;
  }

  async execute() {
    return await this.pessoasRepository.contagem();
  }
}
