import { IFlashCard } from "../../models/flashcard";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteFlashcardRepository } from "./protocols";

export class DeleteFlashcardController implements IController {
  constructor(
    private readonly deleteFlashcardRepository: IDeleteFlashcardRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IFlashCard | string>> {
    try {
      const pergunta = httpRequest?.params?.pergunta;

      if (!pergunta) {
        return badRequest("Missing flashcard id");
      }

      const flashcard =
        await this.deleteFlashcardRepository.deleteFlashcard(pergunta);

      return ok<IFlashCard>(flashcard);
    } catch (error) {
      return serverError();
    }
  }
}
