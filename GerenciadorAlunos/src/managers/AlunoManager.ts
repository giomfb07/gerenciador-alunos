
import * as fs from "fs";
import * as path from "path";
import {IAluno} from '../interface/IAlunos'
import {Aluno} from '../models/Aluno';


export class AlunoManager {
  private alunos: IAluno[] = [];
  private caminhoArquivo = path.join(__dirname, "../../database/alunos.json");

  constructor() {
    this.carregarAlunos();
  }

  public adicionarAluno(novoAluno: IAluno): void {

    const alunoExiste = this.alunos.some(
      aluno => aluno.matricula.toLowerCase() === novoAluno.matricula.toLowerCase()
    );

    if (alunoExiste) {
      console.log(`O aluno com matrícula '${novoAluno.matricula}' já está cadastrado!\n`);
      return;
    }

    this.alunos.push(novoAluno);
    this.salvarAlunos();
    console.log(`Aluno '${novoAluno.nome}' adicionado com sucesso!\n`);
  }

  public listarAlunos(): void {

    if (this.alunos.length === 0) {
      console.log("Nenhum aluno cadastrado ): \n");
      return;
    }

    this.alunos.forEach(({ matricula, nome, idade }) => {
      const alunoInstancia = new Aluno(matricula, nome, idade);
      alunoInstancia.exibirDetalhes();
    });
  }

  public async editarAluno(alunoBusca: IAluno) {
    const indice = this.alunos.findIndex(
      aluno => aluno.matricula.toLowerCase() === alunoBusca.matricula.toLowerCase()
    );
  
    if (indice < 0) {
      console.log(`Aluno com matrícula '${alunoBusca.matricula}' não encontrado.\n`);
      return;
    }
  
    this.alunos[indice] = alunoBusca;
    this.salvarAlunos();
    console.log(`Aluno com matrícula '${alunoBusca.matricula}' editado!\n`);
  }
  
  public async deletarAluno(alunoDeletado: IAluno) {
    const indice = this.alunos.findIndex(
      aluno => aluno.matricula.toLowerCase() === alunoDeletado.matricula.toLowerCase()
    );
  
    if (indice < 0) {
      console.log(`Aluno com matrícula '${alunoDeletado.matricula}' não encontrado.\n`);
      return;
    }

    alunoDeletado = this.alunos.splice(indice, 1)[0];

    this.salvarAlunos();
    console.log(`Aluno com matrícula '${alunoDeletado.matricula}' deletado!\n`);
  }

  private salvarAlunos(): void {
    try {
      const pastaData = path.dirname(this.caminhoArquivo);
      if (!fs.existsSync(pastaData)) {
        fs.mkdirSync(pastaData, { recursive: true });
      }

      fs.writeFileSync(this.caminhoArquivo, JSON.stringify(this.alunos, null, 2));
    } catch (error) {
      console.error("Erro ao salvar alunos:", error);
    }
  }

  private carregarAlunos(): void {
    try {
      if (fs.existsSync(this.caminhoArquivo)) {
        const dados = fs.readFileSync(this.caminhoArquivo, "utf-8");
        this.alunos = JSON.parse(dados);
      }
    } catch (error) {
      console.error("Erro ao carregar alunos:", error);
    }

  }

}
