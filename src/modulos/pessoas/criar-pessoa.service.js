export class CriarPessoaService {
    constructor(pessoasRepository) {
        this.pessoasRepository = pessoasRepository;
    }

    async execute(pessoa) {
        return await this.pessoasRepository.criar(pessoa);
    }
}