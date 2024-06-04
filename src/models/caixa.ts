import { FlashCard } from "./flashcard";

export interface Caixa {
  flashcards: FlashCard[];
}

export class Caixa {
  public flashcards: FlashCard[];

  constructor(flashcards: FlashCard[]) {
    this.flashcards = flashcards;
  }

  inserirFlashCard(flashcard: FlashCard): void {
    this.flashcards.push(flashcard);
  }
  removerFlashCard(flashcard: FlashCard): void {
    this.flashcards = this.flashcards.filter(
      (flashcardAtual) => flashcardAtual !== flashcard
    );
  }
  iniciarEstudo(): FlashCard[] {
    const flashcards_estudo = this.flashcards.filter((flashcard) => {
      flashcard.estudar();
    });
    return flashcards_estudo;
  }
  passarFlashCard(flashcard: FlashCard): void {
    flashcard.passar();
  }
  responderFlashCard(flashcard: FlashCard, resposta: string): boolean {
    return flashcard.responder(resposta);
  }
  finalizarEstudo(): void {
    this.flashcards.forEach((flashcard) => {
      flashcard.atualizarCaixaId();
    });
  }
}
