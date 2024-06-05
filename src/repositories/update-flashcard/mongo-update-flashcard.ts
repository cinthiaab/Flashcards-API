import { ObjectId } from "mongodb";

import {
  IUpdateFlashcardRepository,
  UpdateFlashcardParams,
} from "../../controllers/update-flashcard/protocols";
import { MongoClient } from "../../database/mongodb";
import { IFlashCard } from "../../models/flashcard";

export class MongoUpdateFlashcardRepository
  implements IUpdateFlashcardRepository
{
  async updateFlashcard(
    pergunta: string,
    params: UpdateFlashcardParams
  ): Promise<IFlashCard> {
    const nova_pergunta = pergunta;
    if(params.pergunta){
        const nova_pergunta = params.pergunta;
    }
    await MongoClient.db.collection("flashcards").updateOne(
      { pergunta },
      {
        $set: {
          ...params,
        },
      }
    );

    const flashcard = await MongoClient.db
      .collection<IFlashCard>("flashcards")
      .findOne({ nova_pergunta });

    if (!flashcard) {
      throw new Error("Flashcard not updated");
    }

    const { _id, ...rest } = flashcard;

    return { ...rest };
  }
}
