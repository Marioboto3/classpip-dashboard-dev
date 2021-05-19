export class TablaJornadas {

  numeroDeJornada: number;
  fecha: any;
  criterioGanador: string;
  id: number;
  ganadoresFormulaUno: {
    nombre: string[];
    id: number[]
  } = {nombre: undefined, id: undefined};
  disputada: boolean;

  constructor(NumeroDeJornada?: number, Fecha?: any, CriterioGanador?: string, id?: number, GanadoresFormulaUno?: string[],
              GanadoresFormulaUnoId?: number[], Disputada?: boolean) {

    this.numeroDeJornada = NumeroDeJornada;
    this.fecha = Fecha;
    this.criterioGanador = CriterioGanador;
    this.id = id;
    if (GanadoresFormulaUno !== undefined && GanadoresFormulaUnoId !== undefined) {
      this.ganadoresFormulaUno.nombre = GanadoresFormulaUno;
      this.ganadoresFormulaUno.id = GanadoresFormulaUnoId;
    }
    this.disputada = Disputada;

  }
}
