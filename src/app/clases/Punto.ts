export class Punto {
  nombre: string;
  descripcion: string;
  id: number;
  profesorId: number;

  constructor(nombre?: string, descripcion?: string) {

    this.nombre = nombre;
    this.descripcion = descripcion;
  }

}
