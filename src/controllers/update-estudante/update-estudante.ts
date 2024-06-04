import { IEstudante } from "../../models/estudante";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IUpdateEstudanteRepository, UpdateEstudanteParams } from "./protocols";

export class UpdateEstudanteController implements IController {
  constructor(
    private readonly updateEstudanteRepository: IUpdateEstudanteRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<UpdateEstudanteParams>
  ): Promise<HttpResponse<IEstudante | string>> {
    try {
      const email = httpRequest?.params?.email;
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Missing fields.");
      }

      if (!email) {
        return badRequest("Missing estudante email");
      }

      const allowedFieldsToUpdate: (keyof UpdateEstudanteParams)[] = [
        "nome",
        "senha",
        "flashcards",
      ];

      const someFieldIsNotAllowedToUpdate = Object.keys(body).some(
        (key) =>
          !allowedFieldsToUpdate.includes(key as keyof UpdateEstudanteParams)
      );

      if (someFieldIsNotAllowedToUpdate) {
        return badRequest("Some received field is not allowed");
      }

      const estudante = await this.updateEstudanteRepository.updateEstudante(
        email,
        body
      );

      return ok<IEstudante>(estudante);
    } catch (error) {
      return serverError();
    }
  }
}
