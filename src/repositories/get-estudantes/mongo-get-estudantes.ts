import { IGetEstudantesRepository } from "../../controllers/get-estudantes/protocols";
import { MongoClient } from "../../database/mongodb";
import { IEstudante } from "../../models/estudante";

export class MongoGetEstudantesRepository implements IGetEstudantesRepository {
  async getEstudantes(): Promise<IEstudante[]> {
    const estudantes = await MongoClient.db
      .collection<IEstudante>("estudantes")
      .find({})
      .toArray();

    return estudantes.map(({ _id, ...rest }) => ({
      ...rest,
    }));
  }
}
