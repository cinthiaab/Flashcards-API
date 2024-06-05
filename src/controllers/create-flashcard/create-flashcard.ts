import { IFlashCard } from "../../models/flashcard";
import { FlashCard } from "../../models/flashcard";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateFlashcardParams, ICreateFlashcardRepository } from "./protocols";

export class CreateFlashcardController implements IController {
  constructor(
    private readonly createFlashcardRepository: ICreateFlashcardRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateFlashcardParams>
  ): Promise<HttpResponse<IFlashCard | string>> {
    try {
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Verifique os campos enviados.");
      }

      const neededFields = ["Pergunta", "Resposta"];

      let someFieldIsMissing = false;

      const bodyKeys = Object.keys(body);

      for (let i = 0; i < 2; i++) {
        if (neededFields[i] != bodyKeys[i]) {
          someFieldIsMissing = true;
        }
      }

      if (someFieldIsMissing) {
        return badRequest("Verfique os campos enviados.");
      }

      const flashcard = new FlashCard(
        httpRequest.body!.pergunta,
        httpRequest.body!.resposta,
      );

      const flashcardPerguntaCadastrada =
        this.createFlashcardRepository.getPerguntaCadastrada(
          httpRequest.body!.pergunta
        );

      if ((await flashcardPerguntaCadastrada) == true) {
        return badRequest("Flashcard já cadastrado no sistema");
      }

      const flashcard_repository =
        await this.createFlashcardRepository.createFlashcard(
          flashcard.retornarDadosFlashcard()
        );

      return created<IFlashCard>(flashcard_repository);
    } catch (error) {
      return serverError();
    }
  }
}
