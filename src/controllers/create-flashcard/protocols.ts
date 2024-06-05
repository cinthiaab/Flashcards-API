import { IFlashCard } from "../../models/flashcard";

export interface CreateFlashcardParams {
    pergunta: string;
    resposta: string;
    dataUltimaVisualizacao: Date | null;
    caixaId: number;
    qtdPontos: number;
    status: string;
}

export interface ICreateFlashcardRepository {
  createFlashcard(params: CreateFlashcardParams): Promise<IFlashCard>;
  getPerguntaCadastrada(pergunta: string): Promise<boolean>;
}
