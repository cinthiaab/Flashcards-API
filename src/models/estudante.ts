import { Caixa } from "../models/caixa";

export interface IEstudante {
  nome: string;
  email: string;
  senha: string;
  flashcards: Caixa | null;
}

export class Estudante {
  private nomeEstudante: string;
  private emailEstudante: string;
  private senhaEstudante: string;
  private flashcardsEstudante: Caixa | null;

  constructor(nome: string, email: string, senha: string, flashcards?: Caixa) {
    this.nomeEstudante = nome;
    this.emailEstudante = email;
    this.senhaEstudante = senha;
    this.flashcardsEstudante = flashcards || new Caixa([]);
  }

  validarEmail(): string {
    var erro: string = "";
    if (!this.emailEstudante.includes("@")) {
      erro += "Email inválido.\n";
    }
    if (this.emailEstudante.length == 0 || this.emailEstudante.length >= 255) {
      erro += "Email deve ter entre 1 e 254 caracteres. \n";
    }
    return erro;
  }

  validarSenha(): string {
    var erro: string = "";
    if (this.senhaEstudante.length < 6 || this.senhaEstudante.length > 20) {
      erro = "Senha deve ter entre 6 e 20 caracteres. \n";
    }
    return erro;
  }

  validarNome(): string {
    var erro: string = "";
    if (this.nomeEstudante.length === 0 || this.nomeEstudante.length >= 255) {
      erro = "Nome deve ter entre 1 e 254 caracteres";
    }
    return erro;
  }

  validarEstudante(): string {
    var errors: string = "";
    const emailError = this.validarEmail();
    if (emailError) {
      errors += emailError;
    }
    const senhaError = this.validarSenha();
    if (senhaError) {
      errors += senhaError;
    }
    const nomeError = this.validarNome();
    if (nomeError) {
      errors += nomeError;
    }
    return errors;
  }
  retornarDadosEstudante(): IEstudante {
    return {
      nome: this.nomeEstudante,
      email: this.emailEstudante,
      senha: this.senhaEstudante,
      flashcards: this.flashcardsEstudante,
    };
  }
}
