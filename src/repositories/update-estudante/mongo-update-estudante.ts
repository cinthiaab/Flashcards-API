import { ObjectId } from "mongodb";

import {
  IUpdateEstudanteRepository,
  UpdateEstudanteParams,
} from "../../controllers/update-estudante/protocols";
import { MongoClient } from "../../database/mongodb";
import { IEstudante } from "../../models/estudante";

export class MongoUpdateEstudanteRepository
  implements IUpdateEstudanteRepository
{
  async updateEstudante(
    email: string,
    params: UpdateEstudanteParams
  ): Promise<IEstudante> {
    await MongoClient.db.collection("estudantes").updateOne(
      { email },
      {
        $set: {
          ...params,
        },
      }
    );

    const estudante = await MongoClient.db
      .collection<IEstudante>("estudantes")
      .findOne({ email });

    if (!estudante) {
      throw new Error("Estudante not updated");
    }

    const { _id, ...rest } = estudante;

    return { ...rest };
  }
}
