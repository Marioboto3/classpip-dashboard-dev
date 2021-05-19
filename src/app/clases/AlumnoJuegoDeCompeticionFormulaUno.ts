export class AlumnoJuegoDeCompeticionFormulaUno {

  puntosTotalesAlumno: number;
  id: number;
  alumnoId: number;
  juegoDeCompeticionFormulaUnoId: number;

  constructor(AlumnoId?: number, JuegoDeCompeticionFormulaUnoId?: number, PuntosTotalesAlumno?: number, id?: number) {

    this.puntosTotalesAlumno = PuntosTotalesAlumno;
    this.id = id;
    this.alumnoId = AlumnoId;
    this.juegoDeCompeticionFormulaUnoId = JuegoDeCompeticionFormulaUnoId;

  }
}
