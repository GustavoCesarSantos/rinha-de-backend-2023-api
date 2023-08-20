export class EncontrarPessoasService {
  constructor(pessoasRepository) {
    this.pessoasRepository = pessoasRepository;
  }

  async execute(query) {
    return await this.pessoasRepository.encontrarPessoas(query);
  }
}
