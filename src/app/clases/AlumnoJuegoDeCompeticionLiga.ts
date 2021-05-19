export class AlumnoJuegoDeCompeticionLiga {

  puntosTotalesAlumno: number;
  id: number;
  alumnoId: number;
  juegoDeCompeticionLigaId: number;

  constructor(AlumnoId?: number, JuegoDeCompeticionLigaId?: number, PuntosTotalesAlumno?: number, id?: number) {

    this.puntosTotalesAlumno = PuntosTotalesAlumno;
    this.id = id;
    this.alumnoId = AlumnoId;
    this.juegoDeCompeticionLigaId = JuegoDeCompeticionLigaId;

  }
}
