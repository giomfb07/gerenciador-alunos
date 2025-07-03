import inquirer from 'inquirer';
import { IAluno } from '../interface/IAlunos';

export async function promptParaDetalhesDoAluno(): Promise<IAluno> {
  const respostas = await inquirer.prompt([
    {
      type: 'input',
      name: 'matricula',
      message: 'Digite a matrícula do aluno:',
      validate: input => input.trim() !== '' ? true : 'A matrícula não pode ser vazia.'
    },
    {
      type: 'input',
      name: 'nome',
      message: 'Digite o nome do aluno:'
    },
    {
      type: 'number',
      name: 'idade',
      message: 'Digite a idade do aluno:',
      validate: input => input > 0 ? true : 'A idade deve ser um número positivo.'
    }
  ]);

  return {
    matricula: respostas.matricula,
    nome: respostas.nome,
    idade: respostas.idade
  };
}

export async function promptMenuPrincipal(): Promise<string> {
  const resposta = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcao',
      message: 'Escolha uma opção:',
      choices: ['Adicionar Aluno', 'Listar Alunos', 'Sair']
    }
  ]);

  return resposta.opcao;
}
