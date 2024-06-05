import { IFlashCard } from "../../models/flashcard";

export interface IDeleteFlashcardRepository {
  deleteFlashcard(pergunta: string): Promise<IFlashCard>;
}
