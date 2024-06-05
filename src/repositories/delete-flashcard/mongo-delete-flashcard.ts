import { ObjectId } from "mongodb";

import { IDeleteFlashcardRepository } from "../../controllers/delete-flashcard/protocols";
import { MongoClient } from "../../database/mongodb";
import { IFlashCard } from "../../models/flashcard";

export class MongoDeleteFlashcardRepository
  implements IDeleteFlashcardRepository
{
  async deleteFlashcard(pergunta: string): Promise<IFlashCard> {
    const flashcard = await MongoClient.db
      .collection<IFlashCard>("flashcards")
      .findOne({ pergunta });

    if (!flashcard) {
      throw new Error("Flashcard não foi encontrado");
    }

    const { deletedCount } = await MongoClient.db
      .collection("flashcards")
      .deleteOne({ flashcard });

    if (!deletedCount) {
      throw new Error("Flashcard não foi deletado");
    }

    const { _id, ...rest } = flashcard;

    return { ...rest };
  }
}
