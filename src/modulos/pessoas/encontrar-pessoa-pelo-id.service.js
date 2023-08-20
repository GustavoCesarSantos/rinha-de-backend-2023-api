export class EncontrarPessoaPeloIdService {
  constructor(pessoasRepository) {
    this.pessoasRepository = pessoasRepository;
  }

  async execute(id) {
    return await this.pessoasRepository.encontrarPeloId(id);
  }
}
