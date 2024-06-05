import { IFlashCard } from "@/models/flashcard";

export interface IGetFlashcardRepository {
  getFlashcard(pergunta: string): Promise<IFlashCard>;
}

