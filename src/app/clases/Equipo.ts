export class Equipo {
  nombre: string;
  fotoEquipo: string;
  id: number;
  grupoId: number;

  constructor(nombre?: string, FotoEquipo?: string) {

    this.nombre = nombre;
    this.fotoEquipo = FotoEquipo;
  }
}
