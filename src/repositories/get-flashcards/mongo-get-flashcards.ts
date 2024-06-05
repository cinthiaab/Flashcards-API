
import { IGetFlashcardsRepository } from "../../controllers/get-flashcards/protocols";
import { MongoClient } from "../../database/mongodb";
import { IFlashCard } from "../../models/flashcard";

export class MongoGetFlashcardsRepository implements IGetFlashcardsRepository {
  async getFlashcards(email:string): Promise<IFlashCard[]> {
    const flashcards = await MongoClient.db
      .collection<IFlashCard>("flashcards")
      .find({ email })
      .toArray();

    return flashcards.map(({ _id, ...rest }) => ({
      ...rest,
    }));
  }
}
