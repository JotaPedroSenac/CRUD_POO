// index.js
const { AlunoController } = require("./src/controllers/ControllerAluno");
const { Curso } = require("./src/models/Curso");

const alunos = new AlunoController();

alunos.adicionarAluno('Fulano', 'fulano@email.com', '84999999999', '654829', 'informatica');
alunos.listarAluno();