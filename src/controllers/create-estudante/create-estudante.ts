import { IEstudante } from "../../models/estudante";
import { Estudante } from "../../models/estudante";
import { badRequest, created, serverError } from "../helpers";
import { HttpRequest, HttpResponse, IController } from "../protocols";
import { CreateEstudanteParams, ICreateEstudanteRepository } from "./protocols";

export class CreateEstudanteController implements IController {
  constructor(
    private readonly createEstudanteRepository: ICreateEstudanteRepository
  ) {}

  async handle(
    httpRequest: HttpRequest<CreateEstudanteParams>
  ): Promise<HttpResponse<IEstudante | string>> {
    try {
      const body = httpRequest?.body;

      if (!body) {
        return badRequest("Verifique os campos enviados.");
      }

      const neededFields = ["nome", "email", "senha"];

      let someFieldIsMissing = false;

      const bodyKeys = Object.keys(body);

      for (let i = 0; i < 3; i++) {
        if (neededFields[i] != bodyKeys[i]) {
          someFieldIsMissing = true;
        }
      }

      if (someFieldIsMissing) {
        return badRequest("Verfique os campos enviados.");
      }

      const estudante = new Estudante(
        httpRequest.body!.nome,
        httpRequest.body!.email,
        httpRequest.body!.senha
      );
      const erroREstudante: string = estudante.validarEstudante();

      if (erroREstudante != "") {
        return badRequest(erroREstudante);
      }

      const estudanteEmailCadastrado =
        this.createEstudanteRepository.getEmailCadastrado(
          httpRequest.body!.email
        );

      if ((await estudanteEmailCadastrado) == true) {
        return badRequest("E-mail já cadastrado no sistema");
      }

      const estudante_repository =
        await this.createEstudanteRepository.createEstudante(
          estudante.retornarDadosEstudante()
        );

      return created<IEstudante>(estudante_repository);
    } catch (error) {
      return serverError();
    }
  }
}
