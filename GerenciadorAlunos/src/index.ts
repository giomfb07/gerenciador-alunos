import { AlunoManager } from './managers/AlunoManager';
import { promptMenuPrincipal, promptParaDetalhesDoAluno } from './utils/prompts';

async function main() {
  const alunoManager = new AlunoManager();

  let continuar = true;

  while (continuar) {
    const escolha = await promptMenuPrincipal();

    switch (escolha) {
      case 'Adicionar Aluno':
        const novoAluno = await promptParaDetalhesDoAluno();
        alunoManager.adicionarAluno(novoAluno);
        break;
      case 'Listar Alunos':
        alunoManager.listarAlunos();
        break;
      case 'Sair':
        continuar = false;
        console.log('Encerrando o programa...');
        break;
    }
  }
}

main();
