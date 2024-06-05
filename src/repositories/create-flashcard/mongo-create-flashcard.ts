import {
    CreateFlashcardParams,
    ICreateFlashcardRepository,
  } from "../../controllers/create-flashcard/protocols";
  import { MongoClient } from "../../database/mongodb";
  import { IFlashCard } from "../../models/flashcard";
  
  export class MongoCreateFlashcardRepository
    implements ICreateFlashcardRepository
  {
    async createFlashcard(params: IFlashCard): Promise<IFlashCard> {
      const { insertedId } = await MongoClient.db
        .collection("flashcards")
        .insertOne(params);
  
      const flashcard = await MongoClient.db
        .collection<IFlashCard>("flashcards")
        .findOne({ _id: insertedId });
  
      if (!flashcard) {
        throw new Error("Flashcard not created");
      }
  
      const { _id, ...rest } = flashcard;
  
      return { ...rest };
    }
    async getPerguntaCadastrada(pergunta: string): Promise<boolean> {
        const flashcard = await MongoClient.db
          .collection<IFlashCard>("flashcards")
          .findOne({ pergunta });
        var perguntaValida: boolean;
    
        if (!flashcard) {
          perguntaValida = false;
        } else {
          perguntaValida = true;
        }
    
        return perguntaValida;
      }
  }
  