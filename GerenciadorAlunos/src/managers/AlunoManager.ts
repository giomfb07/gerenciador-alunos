
import * as fs from "fs";
import * as path from "path";
import {IAluno} from '../interface/IAlunos'
import { Aluno } from '../models/Aluno';

export class AlunoManager {
  private alunos: IAluno[] = [];
  private caminhoArquivo = path.join(__dirname, '../../database/alunos.json');

  constructor() {
    this.carregarAlunos();
  }

  public adicionarAluno(novoAluno: IAluno): void {
    const jaExiste = this.alunos.some(
      aluno => aluno.matricula.toLowerCase() === novoAluno.matricula.toLowerCase()
    );

    if (jaExiste) {
      console.log(`Erro: O aluno com matrícula '${novoAluno.matricula}' já está cadastrado!\n`);
      return;
    }

    this.alunos = [...this.alunos, novoAluno];
    this.salvarAlunos();
    console.log(`Aluno '${novoAluno.nome}' adicionado com sucesso!\n`);
  }

  public listarAlunos(): void {
    if (this.alunos.length === 0) {
      console.log("Nenhum aluno cadastrado.\n");
      return;
    }

    this.alunos.forEach(({ matricula, nome, idade }) => {
      const alunoInstancia = new Aluno(matricula, nome, idade);
      alunoInstancia.exibirDetalhes();
    });
  }

  private salvarAlunos(): void {
    const pastaDatabase = path.dirname(this.caminhoArquivo);
    if (!fs.existsSync(pastaDatabase)) {
      fs.mkdirSync(pastaDatabase, { recursive: true });
    }

    fs.writeFileSync(this.caminhoArquivo, JSON.stringify(this.alunos, null, 2));
  }

  private carregarAlunos(): void {
    if (fs.existsSync(this.caminhoArquivo)) {
      const dados = fs.readFileSync(this.caminhoArquivo, 'utf-8');
      this.alunos = JSON.parse(dados);
    }
  }
}


