import {
  CreateEstudanteParams,
  ICreateEstudanteRepository,
} from "../../controllers/create-estudante/protocols";
import { MongoClient } from "../../database/mongodb";
import { IEstudante } from "../../models/estudante";

export class MongoCreateEstudanteRepository
  implements ICreateEstudanteRepository
{
  async createEstudante(params: IEstudante): Promise<IEstudante> {
    const { insertedId } = await MongoClient.db
      .collection("estudantes")
      .insertOne(params);

    const estudante = await MongoClient.db
      .collection<IEstudante>("estudantes")
      .findOne({ _id: insertedId });

    if (!estudante) {
      throw new Error("Estudante not created");
    }

    const { _id, ...rest } = estudante;

    return { ...rest };
  }
  async getEmailCadastrado(email: string): Promise<boolean> {
    const estudante = await MongoClient.db
      .collection<IEstudante>("estudantes")
      .findOne({ email });
    var emailValido: boolean;

    if (!estudante) {
      emailValido = false;
    } else {
      emailValido = true;
    }

    return emailValido;
  }
}
