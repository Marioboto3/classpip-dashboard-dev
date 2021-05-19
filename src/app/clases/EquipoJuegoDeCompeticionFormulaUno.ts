export class EquipoJuegoDeCompeticionFormulaUno {

  puntosTotalesEquipo: number;
  equipoId: number;
  juegoDeCompeticionFormulaUnoId: number;
  id: number;

  constructor(EquipoId?: number, JuegoDeCompeticionFormulaUnoId?: number, PuntosTotalesEquipo?: number, id?: number) {

    this.equipoId = EquipoId;
    this.juegoDeCompeticionFormulaUnoId = JuegoDeCompeticionFormulaUnoId;
    this.puntosTotalesEquipo = PuntosTotalesEquipo;
    this.id = id;
  }
}
