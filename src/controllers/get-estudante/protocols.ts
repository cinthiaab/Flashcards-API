import { IEstudante } from "../../models/estudante";

export interface IGetEstudanteRepository {
  getEstudante(email: string): Promise<IEstudante>;
}

export interface GetEstudanteParams {
  email: string;
  senha: string;
}
