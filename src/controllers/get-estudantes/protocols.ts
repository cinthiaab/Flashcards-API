import { IEstudante } from "../../models/estudante";

export interface IGetEstudantesRepository {
  getEstudantes(): Promise<IEstudante[]>;
}
