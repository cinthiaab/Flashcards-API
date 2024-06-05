import { IFlashCard } from "../../models/flashcard";
import { ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetFlashcardsRepository } from "./protocols";

export class GetFlashcardsController implements IController {
  constructor(
    private readonly getFlashcardsRepository: IGetFlashcardsRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IFlashCard[] | string>> {
    try {
      const email = httpRequest?.body?.email;
      const flashcards = await this.getFlashcardsRepository.getFlashcards(email);

      return ok<IFlashCard[]>(flashcards);
    } catch (error) {
      return serverError();
    }
  }
}
