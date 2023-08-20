import { Proteger } from "./helpers/proteger.js";
import { PessoasRepository } from "./modulos/pessoas/pessoas.repository.js";
import { CriarPessoaService } from "./modulos/pessoas/criar-pessoa.service.js";
import { CriarPessoaController } from "./modulos/pessoas/criar-pessoa.controller.js";
import { EncontrarPessoaPeloIdService } from "./modulos/pessoas/encontrar-pessoa-pelo-id.service.js";
import { EncontrarPessoaController } from "./modulos/pessoas/encontrar-pessoa.controller.js";
import { EncontrarPessoasService } from "./modulos/pessoas/encontrar-pessoas.service.js";
import { EncontrarPessoasController } from "./modulos/pessoas/encontrar-pessoas.controller.js";

const pessoasRepository = new PessoasRepository();
const proteger = new Proteger(pessoasRepository);
const criarPessoaService = new CriarPessoaService(pessoasRepository);
const criarPessoaController = new CriarPessoaController({
  proteger,
  criarPessoaService,
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
};
