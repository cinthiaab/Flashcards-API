import { IEstudante } from "../../models/estudante";

export interface IDeleteEstudanteRepository {
  deleteEstudante(email: string): Promise<IEstudante>;
}
