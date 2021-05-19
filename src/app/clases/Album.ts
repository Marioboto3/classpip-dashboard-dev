export class Album {
  alumnoJuegoDeColeccionId: number;
  cromoId: number;
  fecha: string;
  id: number;


  constructor(alumnoJuegoDeColeccionId?: number, cromoId?: number, Fecha?: string) {

    this.alumnoJuegoDeColeccionId = alumnoJuegoDeColeccionId;
    this.cromoId = cromoId;
    this.fecha = Fecha;
  }
}
