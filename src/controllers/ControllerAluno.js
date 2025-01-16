// Importações
const { pool } = require("../config/database");
const { Aluno } = require("../models/Aluno");
const { Curso } = require("../models/Curso"); // <== Adicione esta linha

class AlunoController {
    async adicionarAluno(nome, email, telefone, matricula, curso) {
        try {

            // const query = `select * from aluno where matricula = $4`;
            // const val = [matricula];
            // const resposta = await pool.query(query, val);
            // if (resposta.rows.length > 1) {
            //     return console.error('Aluno já existe');
            // }


            const consulta = `INSERT INTO aluno (nome, email, telefone, matricula, curso) 
            values ($1, $2, $3, $4, $5) RETURNING *` ; //não passar os valores aqui por segurança
            const valores = [nome, email, telefone, matricula, curso];
            const res = await pool.query(consulta, valores);
            console.log(`Dados criados com sucesso`);
            console.table(res.rows[0]);
            // return rows[0];
        } catch (error) {
            console.error("Erro ao criar aluno:", error.message);
        }
    }

    async editarAluno(matricula, novoNome, novoEmail, novoTelefone, novoCurso) {
        try {
            const consulta = `select * from aluno where matricula = $1`;
            const valores = [matricula];
            const resposta = await pool.query(consulta, valores);
            if (resposta.rows.length === 0) {
                return console.error('Aluno não encontrado');
            }

            const consultaEditar = `UPDATE aluno SET 
            nome = coalesce($2, nome),
            email = coalesce($3, email),
            telefone = coalesce($4, telefone),
            curso = coalesce($5, curso)
            WHERE matricula = $1 RETURNING *`;

            const dadosEditados = [matricula, novoNome, novoEmail, novoTelefone, novoCurso];

            const res = await pool.query(consultaEditar, dadosEditados);

            console.log('Dados editados com sucesso');
            console.table(res.rows[0]);


        } catch (error) {
            console.error("Erro ao editar aluno:", error.message);
        }
    }

    async excluirAluno(matricula) {
        try {
            const consulta = `select * from aluno where matricula = $1`;
            const valores = [matricula];
            const res = await pool.query(consulta, valores);

            if (res.rows.length === 0) {
                return console.error('Aluno não encontrado');
            }

            const consultaDeletar = `delete from aluno where matricula = $1`;
            const resposta = await pool.query(consultaDeletar, valores);
            console.log('Aluno excluido com sucesso');
            console.table(resposta.rows[0]);

        } catch (error) {
            console.error("Erro ao excluir aluno:", error.message);
        }
    }

    async listarAluno() {
        try {
            const consulta = `select nome, email, telefone from aluno`;
            const dados = await pool.query(consulta);
            console.table(dados.rows);
        } catch (error) {

        }
    }
}

module.exports = { AlunoController };
