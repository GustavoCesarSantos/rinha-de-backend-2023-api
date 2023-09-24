import { PessoasRepository } from "./modulos/pessoas/pessoas.repository.js";
import { CriarPessoaController } from "./modulos/pessoas/criar-pessoa.controller.js";
import { EncontrarPessoaController } from "./modulos/pessoas/encontrar-pessoa.controller.js";
import { EncontrarPessoasController } from "./modulos/pessoas/encontrar-pessoas.controller.js";
import { ContagemPessoasController } from "./modulos/pessoas/contagem-pessoas.controller.js";

const pessoasRepository = new PessoasRepository();
const criarPessoaController = new CriarPessoaController({
  pessoasRepository,
});
const encontrarPessoaController = new EncontrarPessoaController({
  pessoasRepository,
});
const encontrarPessoasController = new EncontrarPessoasController({
  pessoasRepository,
});
const contagemPessoasController = new ContagemPessoasController({
  pessoasRepository,
});

export const routes = (router) => {
  router.get(
    "/pessoas",
    encontrarPessoasController.handle.bind(encontrarPessoasController)
  );
  router.post(
    "/pessoas",
    criarPessoaController.handle.bind(criarPessoaController)
  );
  router.get(
    "/pessoas/:id",
    encontrarPessoaController.handle.bind(encontrarPessoaController)
  );
  router.get(
    "/contagem-pessoas",
    contagemPessoasController.handle.bind(contagemPessoasController)
  );
};
