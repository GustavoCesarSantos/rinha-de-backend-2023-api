import { pool } from "../../utils/pgClient.js";

export class PessoasRepository {
  async criar(pessoa) {
    const database = await pool.connect();
    try {
      const response = await database.query(
        "INSERT INTO Pessoas(apelido, nome, nascimento) VALUES($1, $2, $3) RETURNING id",
        [pessoa.apelido, pessoa.nome, pessoa.nascimento]
      );
      return response.rows[0].id;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await database.release(true);
    }
  }

  async encontrarPeloApelido(apelido) {
    const database = await pool.connect();
    try {
      const response = await database.query(
        `SELECT id FROM Pessoas WHERE apelido = $1`,
        [apelido]
      );
      return response.rows.length ? response.rows[0] : null;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      database.end();
    }
  }
}
