import { ObjectId } from "mongodb";

import { IDeleteEstudanteRepository } from "../../controllers/delete-estudante/protocols";
import { MongoClient } from "../../database/mongodb";
import { IEstudante } from "../../models/estudante";

export class MongoDeleteEstudanteRepository
  implements IDeleteEstudanteRepository
{
  async deleteEstudante(email: string): Promise<IEstudante> {
    const estudante = await MongoClient.db
      .collection<IEstudante>("estudantes")
      .findOne({ email });

    if (!estudante) {
      throw new Error("Estudante não foi encontrado");
    }

    const { deletedCount } = await MongoClient.db
      .collection("estudantes")
      .deleteOne({ email });

    if (!deletedCount) {
      throw new Error("Estudante não foi deletado");
    }

    const { _id, ...rest } = estudante;

    return { ...rest };
  }
}
