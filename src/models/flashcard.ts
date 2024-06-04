import { Date } from "date-fns";

export interface FlashCard {
  Pergunta: string;
  Resposta: string;
  DataUltimaVisualizacao: Date | null;
  caixaId: number;
  QtdePontos: number;
  Status: string;
}

export class FlashCard {
  private pergunta: string;
  private resposta: string;
  private dataUltimaVisualizacao: Date | null;

  private qtdePontos: number;
  private status: string;

  constructor(pergunta: string, resposta: string) {
    this.pergunta = pergunta;
    this.resposta = resposta;
    this.dataUltimaVisualizacao = null;
    this.qtdePontos = 0;
    this.status = "ATIVO";
    this.caixaId = 1;
  }

  getPergunta(): string {
    return this.pergunta;
  }

  getResposta(): string {
    return this.resposta;
  }

  setCaixaId(caixaId: number): void {
    this.caixaId = caixaId;
  }

  getCaixaId(): number {
    return this.caixaId;
  }

  responder(resposta: string): boolean {
    var respostaCorreta: boolean = false;
    if (resposta === this.resposta) {
      this.qtdePontos++;
      this.dataUltimaVisualizacao = new Date();
      respostaCorreta = true;
    }
    return respostaCorreta;
  }

  atualizarCaixaId(): void {
    if (this.qtdePontos >= 5) {
      this.caixaId = 2;
    } else if (this.qtdePontos >= 12) {
      this.caixaId = 3;
    } else {
      this.caixaId = 1;
    }
  }

  passar(): void {
    this.dataUltimaVisualizacao = new Date();
  }

  estudar(): boolean {
    var estudo: boolean = false;

    if (
      this.caixaId == 1 &&
      this.calcularDiasUltimaVisualizacaoHoje(this.dataUltimaVisualizacao) >= 1
    ) {
      estudo = true;
    } else if (
      this.caixaId == 2 &&
      this.calcularDiasUltimaVisualizacaoHoje(this.dataUltimaVisualizacao) >= 3
    ) {
      estudo = true;
    } else if (
      this.caixaId == 3 &&
      this.calcularDiasUltimaVisualizacaoHoje(this.dataUltimaVisualizacao) >= 7
    ) {
      estudo = true;
    }
    return estudo;
  }

  calcularDiasUltimaVisualizacaoHoje(data1: Date | null): number {
    var diffInDays;
    if (data1 === null) {
      diffInDays = 0;
    } else {
      const data2 = new Date();
      const diffInMilliseconds = data1.getTime() - data2.getTime();
      diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    }
    return diffInDays;
  }
  getStatus(): string {
    return this.status;
  }
}
