import { IFlashCard } from "../../models/flashcard";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateFlashcardRepository, UpdateFlashcardParams } from "./protocols";

export class UpdateFlashcardController implements IController {
  constructor(
    private readonly updateFlashcardRepository: IUpdateFlashcardRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateFlashcardParams>
  ): Promise<HttpResponse<IFlashCard | string>> {
    try {
      const pergunta = httpRequest?.params?.pergunta;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!pergunta) {
        return badRequest("Missing flashcard pergunta");
      }

      const allowedFieldsToUpdate: (keyof UpdateFlashcardParams)[] = [
        "pergunta",
        "resposta",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) =>
          !allowedFieldsToUpdate.includes(key as keyof UpdateFlashcardParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const flashcard = await this.updateFlashcardRepository.updateFlashcard(
        pergunta,
        body
      );

      return ok<IFlashCard>(flashcard);
    } catch (error) {
      return serverError();
    }
  }
}
