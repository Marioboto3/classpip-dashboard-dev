export class AlbumEquipo {
  equipoJuegoDeColeccionId: number;
  cromoId: number;
  fecha: string;
  id: number;

  constructor(equipoJuegoDeColeccionId?: number, cromoId?: number, Fecha?: string) {

    this.equipoJuegoDeColeccionId = equipoJuegoDeColeccionId;
    this.cromoId = cromoId;
    this.fecha = Fecha;
  }
}
