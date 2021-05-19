export class Jornada {

  fecha: Date;
  criterioGanador: string;
  juegoDeCompeticionLigaId: number;
  ganadoresFormulaUno: number[];
  id: number;

  constructor(Fecha?: Date, CriterioGanador?: string, JuegoDeCompeticionId?: number, GanadoresFormulaUno?: number[]) {

    this.fecha = Fecha;
    this.criterioGanador = CriterioGanador;
    this.juegoDeCompeticionLigaId = JuegoDeCompeticionId;
    this.ganadoresFormulaUno = GanadoresFormulaUno;
  }
}
