import { pgQuery } from "../../utils/pgClient.js";

export class PessoasRepository {
  async cadastrar(pessoa) {
    await pgQuery(
      `
        INSERT INTO pessoas (
          id,
          apelido,
          nome,
          nascimento,
          stack
        )
        VALUES (
          $1,
          $2,
          $3,
          $4,
          $5::json
        );
      `,
      [
        pessoa.id,
        pessoa.apelido,
        pessoa.nome,
        pessoa.nascimento,
        JSON.stringify(pessoa.stack),
      ]
    );
  }

  async encontrarPeloId(id) {
    const pessoa = await pgQuery(
      `
        SELECT
          id,
          apelido,
          nome,
          to_char(nascimento, 'YYYY-MM-DD') as nascimento,
          stack
        FROM
          pessoas
        WHERE 
          id = $1;
      `,
      [id]
    );
    return pessoa.rows;
  }

  async encontrarPessoas(termo) {
    const pessoas = await pgQuery(
      `
        SELECT
          id,
          apelido,
          nome,
          to_char(nascimento, 'YYYY-MM-DD') as nascimento,
          stack
        FROM
            pessoas
        WHERE
          searchable ILIKE $1
        LIMIT 50;
      `,
      [`%${termo}%`]
    );
    return pessoas.rows;
  }

  async contagem() {
    const contagem = await pgQuery(`SELECT COUNT(1) FROM pessoas`);
    return contagem.rows[0].count;
  }
}
