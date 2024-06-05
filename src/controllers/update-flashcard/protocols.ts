
import { IFlashCard } from "../../models/flashcard";

export interface UpdateFlashcardParams {
  pergunta?: string;
  resposta?: string;
}

export interface IUpdateFlashcardRepository {
  updateFlashcard(
    pergunta: string,
    params: UpdateFlashcardParams
  ): Promise<IFlashCard>;
}
