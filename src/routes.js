import { Proteger } from "./helpers/proteger.js"
import { CriarPessoaController } from "./modulos/pessoas/criar-pessoa.controller.js"
import { CriarPessoaService } from "./modulos/pessoas/criar-pessoa.service.js"
import { PessoasRepository } from "./modulos/pessoas/pessoas.repository.js"

const pessoasRepository = new PessoasRepository()
const proteger = new Proteger(pessoasRepository)
const criarPessoaService = new CriarPessoaService(pessoasRepository)
const criarPessoaController = new CriarPessoaController({proteger, criarPessoaService})

export const routes = (router) => {
    router.post('/pessoas', criarPessoaController.handle.bind(criarPessoaController))
}

