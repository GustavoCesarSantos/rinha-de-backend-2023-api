import { Proteger } from "./helpers/proteger.js";
import { PessoasRepository } from "./modulos/pessoas/pessoas.repository.js";
import { CriarPessoaController } from "./modulos/pessoas/criar-pessoa.controller.js";
import { EncontrarPessoaPeloIdService } from "./modulos/pessoas/encontrar-pessoa-pelo-id.service.js";
import { EncontrarPessoaController } from "./modulos/pessoas/encontrar-pessoa.controller.js";
import { EncontrarPessoasService } from "./modulos/pessoas/encontrar-pessoas.service.js";
import { EncontrarPessoasController } from "./modulos/pessoas/encontrar-pessoas.controller.js";
import { ContagemPessoasService } from "./modulos/pessoas/contagem-pessoas.service.js";
import { ContagemPessoasController } from "./modulos/pessoas/contagem-pessoas.controller.js";

const pessoasRepository = new PessoasRepository();
const proteger = new Proteger(pessoasRepository);
const criarPessoaController = new CriarPessoaController({
  proteger,
});
const encontrarPessoaPeloIdService = new EncontrarPessoaPeloIdService(
  pessoasRepository
);
const encontrarPessoaController = new EncontrarPessoaController({
  encontrarPessoaPeloIdService,
});
const encontrarPessoasService = new EncontrarPessoasService(pessoasRepository);
const encontrarPessoasController = new EncontrarPessoasController({
  encontrarPessoasService,
});
const contagemPessoasService = new ContagemPessoasService(pessoasRepository);
const contagemPessoasController = new ContagemPessoasController({
  contagemPessoasService,
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
