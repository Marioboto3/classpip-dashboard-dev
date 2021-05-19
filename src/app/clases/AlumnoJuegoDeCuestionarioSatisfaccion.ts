export class AlumnoJuegoDeCuestionarioSatisfaccion {

  contestado: boolean;
  respuestasAfirmaciones: number [];
  respuestasPreguntasAbiertas: string[];
  id: number;
  alumnoId: number;
  juegoDeCuestionarioSatisfaccionId: number;


  constructor(Contestado?: boolean, juegoDeCuestionarioId?: number, alumnoId?: number) {
      this.contestado = Contestado;
      this.alumnoId = alumnoId;
      this.juegoDeCuestionarioSatisfaccionId = juegoDeCuestionarioId;
  }
}




