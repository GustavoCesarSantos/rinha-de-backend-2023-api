import { pool } from "../../utils/pgClient.js";

export class PessoasRepository {
  async criar(pessoa) {
    const database = await pool.connect();
    try {
      const response = await database.query(
        "INSERT INTO Pessoas(apelido, nome, nascimento, stack) VALUES($1, $2, $3, $4) RETURNING id",
        [pessoa.apelido, pessoa.nome, pessoa.nascimento, pessoa.stack]
      );
      return response.rows[0].id;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await database.release(true);
    }
  }

  async encontrarPeloId(id) {
    const database = await pool.connect();
    try {
      const response = await database.query(
        `SELECT id, apelido, nome, nascimento, stack FROM Pessoas WHERE id = $1`,
        [id]
      );
      return response.rows.length ? response.rows[0] : null;
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
      await database.release(true);
    }
  }

  async encontrarPessoas(query) {
    const database = await pool.connect();
    try {
      const item = `%${query}%`.replace(/"/g, "");
      const response = await database.query(
        `
        SELECT 
          id,
          apelido,
          nome,
          nascimento,
          stack
        FROM 
          Pessoas 
        WHERE 
          apelido LIKE $1
          OR nome LIKE $1
        UNION
        SELECT 
          id,
          apelido,
          nome,
          nascimento,
          stack
        FROM 
          Pessoas 
        WHERE 
          EXISTS (
            SELECT 1
            FROM unnest(stack) AS individual_value
            WHERE individual_value LIKE $1
          )
        LIMIT 50;
        `,
        [item]
      );
      return response.rows;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await database.release(true);
    }
  }

  async contagem() {
    const database = await pool.connect();
    try {
      const response = await database.query(
        "SELECT COUNT(*) AS count FROM Pessoas;"
      );
      return response.rows[0].count;
    } catch (error) {
      throw new Error(error.message);
    } finally {
      await database.release(true);
    }
  }
}
