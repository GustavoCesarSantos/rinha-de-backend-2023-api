import { randomUUID } from "crypto";

import { prisma } from "../../utils/prismaClient.js";
import { pool } from "../../utils/pgClient.js";

export class PessoasRepository {
  async criar(pessoa) {
    try {
      const pessoaID = randomUUID();
      await prisma.pessoas.create({
        data: {
          pessoaID,
          apelido: pessoa.apelido,
          nome: pessoa.nome,
          nascimento: pessoa.nascimento,
          stack:
            pessoa.stack && pessoa.stack.length
              ? pessoa.stack.toString()
              : null,
        },
      });
      return pessoaID;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await prisma.$disconnect();
    }
  }

  async encontrarPeloId(id) {
    try {
      const pessoa = await prisma.pessoas.findUnique({
        where: { pessoaID: id },
      });
      if (!pessoa) return null;
      return {
        id: pessoa.pessoaID,
        apelido: pessoa.apelido,
        nome: pessoa.nome,
        nascimento: pessoa.nascimento,
        stack: pessoa.stack ? pessoa.stack.split(",") : null,
      };
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await prisma.$disconnect();
    }
  }

  async encontrarPeloApelido(apelido) {
    try {
      return await prisma.pessoas.findUnique({
        where: { apelido },
      });
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await prisma.$disconnect();
    }
  }

  async encontrarPessoas(contains) {
    try {
      const pessoas = await prisma.pessoas.findMany({
        where: {
          OR: [
            {
              apelido: { contains, mode: "insensitive" },
            },
            {
              nome: { contains, mode: "insensitive" },
            },
            {
              stack: { contains, mode: "insensitive" },
            },
          ],
        },
      });
      return pessoas.map((pessoa) => {
        return {
          id: pessoa.pessoaID,
          apelido: pessoa.apelido,
          nome: pessoa.nome,
          nascimento: pessoa.nascimento,
          stack: pessoa.stack ? pessoa.stack.split(",") : null,
        };
      });
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await prisma.$disconnect();
    }
  }

  async contagem() {
    try {
      return await prisma.pessoas.count();
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await prisma.$disconnect();
    }
  }
}
