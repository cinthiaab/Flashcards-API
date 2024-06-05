import { ObjectId } from "mongodb";

import { IGetFlashcardRepository } from "../../controllers/get-flashcard/protocols";
import { MongoClient } from "../../database/mongodb";
import { IFlashCard } from "../../models/flashcard";

export class MongoGetFlashcardRepository implements IGetFlashcardRepository {
  async getFlashcard(pergunta: string): Promise<IFlashCard> {
    const flashcard = await MongoClient.db
      .collection<IFlashCard>("flashcards")
      .findOne({ pergunta });

    if (!flashcard) {
      throw new Error("Flashcard não foi encontrado");
    }

    const { _id, ...rest } = flashcard;

    return { ...rest };
  }
}