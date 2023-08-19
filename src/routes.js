import { CriarPessoaController } from "./modulos/pessoas/criar-pessoa.controller.js"

const criarPessoaController = new CriarPessoaController()

export const routes = (router) => {
    router.post('/pessoas', criarPessoaController.handle.bind(this))
}

