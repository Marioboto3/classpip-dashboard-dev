export class AlumnoJuegoDeCuestionario {

  nota: number;
  tiempoEmpleado: number;
  contestado: boolean;
  id: number;
  alumnoId: number;
  juegoDeCuestionarioId: number;


  constructor(Nota?: number, Contestado?: boolean, juegoDeCuestionarioId?: number, alumnoId?: number, TiempoEmpleado?: number) {
      this.nota = Nota;
      this.contestado = Contestado;
      this.alumnoId = alumnoId;
      this.juegoDeCuestionarioId = juegoDeCuestionarioId;
      this.tiempoEmpleado = TiempoEmpleado;
  }
}
