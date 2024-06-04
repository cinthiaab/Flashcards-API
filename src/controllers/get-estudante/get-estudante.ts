import { IEstudante } from "../../models/estudante";
import { badRequest, ok, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { IGetEstudanteRepository, GetEstudanteParams } from "./protocols";

export class GetEstudanteController implements IController {
  constructor(
    private readonly getEstudanteRepository: IGetEstudanteRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<any>
  ): Promise<HttpResponse<IEstudante | string>> {
    try {
      const email = httpRequest?.body?.email;
      const senha = httpRequest?.body?.senha;

      if (email === "" || senha === "") {
        return badRequest("Missing email or senha.");
      }

      const estudante = await this.getEstudanteRepository.getEstudante(
        httpRequest?.body?.email
      );

      if (!estudante) {
        return badRequest("Estudante not found");
      }

      if (estudante.senha !== senha) {
        return badRequest("Invalid password");
      }

      return ok<IEstudante>(estudante);
    } catch (error) {
      console.error(error);
      return serverError();
    }
  }
}
