export class Grupo {

  nombre: string;
  descripcion: string;
  id: number;
  profesorId: number;

  constructor(nombre?: string, Descripcion?: string) {

    this.nombre = nombre;
    this.descripcion = Descripcion;
  }

}
