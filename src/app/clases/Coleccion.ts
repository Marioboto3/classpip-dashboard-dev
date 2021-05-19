export class Coleccion {
  nombre: string;
  imagenColeccion: string;
  publica: boolean;
  dosCaras: boolean;
  id: number;
  profesorId: number;

  constructor(nombre?: string, imagenColeccion?: string, dosCaras?: boolean, profesorId?: number) {

    this.nombre = nombre;
    this.imagenColeccion = imagenColeccion;
    this.dosCaras = dosCaras;
    this.profesorId = profesorId;
    this.publica = false;
  }
}
