export class AlumnoJuegoDeVotacionTodosAUno {

  puntosTotales: number;
  id: number;
  alumnoId: number;
  juegoDeVotacionTodosAUnoId: number;
  votosEmitidos: any[];
  votosRecibidos: any[];

  constructor(alumnoId?: number, juegoDeVotacionTodosAUnoId?: number) {

    this.alumnoId = alumnoId;
    this.juegoDeVotacionTodosAUnoId = juegoDeVotacionTodosAUnoId;
    this.puntosTotales = 0;
    this.votosEmitidos = [];
    this.votosRecibidos = [];
  }
}
