export class ImagenEscenario {

    nombre: string;
    nombreDelFichero: string;
    profesorId: number;
    id: number;

    constructor(nombre?: string, nombreFichero?: string, profesorId?: number) {
  
      this.nombre = nombre;
      this.nombreDelFichero = nombreFichero;
      this.profesorId = profesorId;
  
    }
  }
  