export class AlumnoJuegoDeVotacionUnoATodos {

  puntosTotales: number;
  id: number;
  alumnoId: number;
  juegoDeVotacionUnoATodosId: number;
  votos: any[];

  constructor(alumnoId?: number, juegoDeVotacionUnoATodosId?: number) {

    this.alumnoId = alumnoId;
    this.juegoDeVotacionUnoATodosId = juegoDeVotacionUnoATodosId;
    this.puntosTotales = 0;
  }
}
