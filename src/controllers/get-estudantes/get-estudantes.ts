import { IEstudante } from "../../models/estudante";
import { ok, serverError } from "../helpers";
import { HttpResponse, IController } from "../protocols";
import { IGetEstudantesRepository } from "./protocols";

export class GetEstudantesController implements IController {
  constructor(
    private readonly getEstudantesRepository: IGetEstudantesRepository
  ) {}

  async handle(): Promise<HttpResponse<IEstudante[] | string>> {
    try {
      const estudantes = await this.getEstudantesRepository.getEstudantes();

      return ok<IEstudante[]>(estudantes);
    } catch (error) {
      return serverError();
    }
  }
}
