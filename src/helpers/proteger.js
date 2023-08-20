export class Proteger {
  constructor(pessoasRepository) {
    this.pessoasRepository = pessoasRepository;
  }

  async contraPessoaInvalida(pessoa) {
    if (!pessoa) {
      return {
        status: "requisição inválida",
        mensagem: "json de criação não enviado",
        caminho: "",
        recebido: "",
        esperado: "",
      };
    }
    if (!pessoa.apelido) {
      return {
        status: "requisição inválida",
        mensagem: "apelido não enviado",
        caminho: "request.body.apelido",
        recebido: "undefined",
        esperado: "string",
      };
    }
    if (typeof pessoa.apelido !== "string") {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "apelido tipo invalido",
        caminho: "request.body.apelido",
        recebido: `${typeof pessoa.apelido}`,
        esperado: "string",
      };
    }
    if (pessoa.apelido.length > 32) {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "apelido com tamanho invalido",
        caminho: "request.body.apelido",
        recebido: `${pessoa.apelido.length}`,
        esperado: "menor ou igual a 32",
      };
    }
    const pessoaDB = await this.pessoasRepository.encontrarPeloApelido(
      pessoa.apelido
    );
    if (pessoaDB) {
      return {
        status: "requisição inválida",
        mensagem: "apelido ja utilizado",
        caminho: "request.body.apelido",
        recebido: "string",
        esperado: "string",
      };
    }
    if (!pessoa.nome) {
      return {
        status: "requisição inválida",
        mensagem: "nome não enviado",
        caminho: "request.body.nome",
        recebido: "undefined",
        esperado: "string",
      };
    }
    if (typeof pessoa.nome !== "string") {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "nome tipo invalido",
        caminho: "request.body.nome",
        recebido: `${typeof pessoa.nome}`,
        esperado: "string",
      };
    }
    if (pessoa.nome.length > 100) {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "nome com tamanho invalido",
        caminho: "request.body.nome",
        recebido: `${pessoa.nome.length}`,
        esperado: "<= 100",
      };
    }
    if (!pessoa.nascimento) {
      return {
        status: "requisição inválida",
        mensagem: "nascimento não enviado",
        caminho: "request.body.nascimento",
        recebido: "undefined",
        esperado: "string",
      };
    }
    if (typeof pessoa.nascimento !== "string") {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "nascimento tipo invalido",
        caminho: "request.body.nascimento",
        recebido: `${typeof pessoa.nascimento}`,
        esperado: "string",
      };
    }
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(pessoa.nascimento)) {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "nascimento com formato invalido",
        caminho: "request.body.nascimento",
        recebido: pessoa.nascimento,
        esperado: "AAAA-MM-DD (ano, mês, dia)",
      };
    }
    const partesData = pessoa.nascimento.split("-");
    const ano = parseInt(partesData[0], 10);
    const mes = parseInt(partesData[1], 10);
    if (mes > 12) {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "nascimento com valor invalido",
        caminho: "request.body.nascimento",
        recebido: pessoa.nascimento,
        esperado: "AAAA-MM-DD (ano, mês(entre 1 e 12), dia(entre 1 e 31))",
      };
    }
    const dia = parseInt(partesData[2], 10);
    if (dia > 31) {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "nascimento com valor invalido",
        caminho: "request.body.nascimento",
        recebido: pessoa.nascimento,
        esperado: "AAAA-MM-DD (ano, mês(entre 1 e 12), dia(entre 1 e 31))",
      };
    }
    const dataObj = new Date(ano, mes - 1, dia);
    if (
      dataObj.getFullYear() !== ano ||
      dataObj.getMonth() !== mes - 1 ||
      dataObj.getDate() !== dia
    ) {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "nascimento com valor invalido",
        caminho: "request.body.nascimento",
        recebido: pessoa.nascimento,
        esperado: "AAAA-MM-DD (ano, mês(entre 1 e 12), dia(entre 1 e 31))",
      };
    }
    if (pessoa.stack === undefined || pessoa.stack === null) return;
    if (typeof pessoa.stack !== "object") {
      return {
        status: "requisição sintaticamente inválida",
        mensagem: "stack tipo invalido",
        caminho: "request.body.stack",
        recebido: `${typeof pessoa.stack}`,
        esperado: "array",
      };
    }
    if (!pessoa.stack.length) {
      return {
        status: "requisição inválida",
        mensagem: "stack vazio",
        caminho: "request.body.stack",
        recebido: "[]",
        esperado: "pelo menos 1 item. Ex. [item1]",
      };
    }
    let index = 0;
    for (const stack of pessoa.stack) {
      if (typeof stack !== "string") {
        return {
          status: "requisição sintaticamente inválida",
          mensagem: `item: ${stack} tipo invalido`,
          caminho: `request.body.stack[${index}]`,
          recebido: `${typeof stack}`,
          esperado: "string",
        };
      }
      if (stack.length > 32) {
        return {
          status: "requisição sintaticamente inválida",
          mensagem: `item: ${stack} com tamanho invalido`,
          caminho: `request.body.stack[${index}]`,
          recebido: stack.length,
          esperado: "menor ou igual a 32",
        };
      }
      index++;
    }
  }
}
