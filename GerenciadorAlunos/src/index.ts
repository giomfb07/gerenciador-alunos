import { AlunoManager } from './managers/AlunoManager';
import { promptMenu, promptDetalhes } from './utils/prompts';

async function main() {
  const manager = new AlunoManager();
  let sair = false;

  while (!sair) {
    const opcao = await promptMenu();

    switch (opcao) {
      case 'Adicionar':
        const novoAluno = await promptDetalhes();
        manager.adicionarAluno(novoAluno);
        break;

      case 'Listar':
        manager.listarAlunos();
        break;

      case 'Editar':
        const alunoBusca = await promptDetalhes();
        console.log(alunoBusca)
        manager.editarAluno(alunoBusca);
        break;
      
        case 'Deletar':
          const deletarAluno = await promptDetalhes();
          console.log(deletarAluno)
          manager.deletarAluno(deletarAluno);
          break;

      case 'Sair':
        sair = true;
        console.log('Encerrando o programa...');
        break;
    }
  }
}

main();
