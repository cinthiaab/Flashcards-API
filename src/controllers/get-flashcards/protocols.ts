import { IFlashCard } from "../../models/flashcard";

export interface IGetFlashcardsRepository {
  getFlashcards(email:string): Promise<IFlashCard[]>;
}
