import { IEstudante } from "../../models/estudante";
import { Caixa } from "../../models/caixa";

export interface CreateEstudanteParams {
  nome: string;
  email: string;
  senha: string;
  flashcards?: Caixa | null;
}

export interface ICreateEstudanteRepository {
  createEstudante(params: CreateEstudanteParams): Promise<IEstudante>;
  getEmailCadastrado(email: string): Promise<boolean>;
}
