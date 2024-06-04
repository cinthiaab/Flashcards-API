import { ObjectId } from "mongodb";

import { IGetEstudanteRepository } from "../../controllers/get-estudante/protocols";
import { MongoClient } from "../../database/mongodb";
import { IEstudante } from "../../models/estudante";

export class MongoGetEstudanteRepository implements IGetEstudanteRepository {
  async getEstudante(email: string): Promise<IEstudante> {
    const estudante = await MongoClient.db
      .collection<IEstudante>("estudantes")
      .findOne({ email });

    if (!estudante) {
      throw new Error("Estudante não foi encontrado");
    }

    const { _id, ...rest } = estudante;

    return { ...rest };
  }
}
