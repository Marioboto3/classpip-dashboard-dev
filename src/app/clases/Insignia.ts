export class Insignia {

  nombre: string;
  descripcion: string;
  imagen: string;
  id: number;
  profesorId: number;


  constructor(nombre?: string, descripcion?: string, imagen?: string) {

    this.nombre = nombre;
    this.descripcion = descripcion;
    this.imagen = imagen;
    
  }

}
