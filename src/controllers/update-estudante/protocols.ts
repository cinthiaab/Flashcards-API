import { IEstudante } from "../../models/estudante";
import { Caixa } from "../../models/caixa";

export interface UpdateEstudanteParams {
  nome?: string;
  senha?: string;
  flashcards?: Caixa;
}

export interface IUpdateEstudanteRepository {
  updateEstudante(
    email: string,
    params: UpdateEstudanteParams
  ): Promise<IEstudante>;
}
