import { IFlashCard } from "../../models/flashcard";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetFlashcardRepository } from "./protocols";

export class GetFlashcardController implements IController {
  constructor(
    private readonly getFlashcardRepository: IGetFlashcardRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IFlashCard | string>> {
    try {
      const pergunta = httpRequest?.body?.pergunta;

      if (pergunta === "") {
        return badRequest("Missing pergunta.");
      }

      const flashcard = await this.getFlashcardRepository.getFlashcard(
        httpRequest?.body?.pergunta
      );

      if (!flashcard) {
        return badRequest("Flashcard not found");
      }

      return ok<IFlashCard>(flashcard);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
