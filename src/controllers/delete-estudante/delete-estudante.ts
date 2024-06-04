import { IEstudante } from "../../models/estudante";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IDeleteEstudanteRepository } from "./protocols";

export class DeleteEstudanteController implements IController {
  constructor(
    private readonly deleteEstudanteRepository: IDeleteEstudanteRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IEstudante | string>> {
    try {
      const email = httpRequest?.params?.email;

      if (!email) {
        return badRequest("Missing estudante id");
      }

      const estudante =
        await this.deleteEstudanteRepository.deleteEstudante(email);

      return ok<IEstudante>(estudante);
    } catch (error) {
      return serverError();
    }
  }
}
