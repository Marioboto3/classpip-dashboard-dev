export class AlbumDelAlumno {
  nombre: string;
  imagenDelante: string;
  imagenDetras: string;
  probabilidad: string;
  nivel: string;
  id: number;
  coleccionId: number;
  // tslint:disable-next-line:semicolon
  tengi: boolean

  constructor(nombre?: string, probabilidad?: string, nivel?: string, tengi?: boolean,  imagenDelante?: string,  imagenDetras?: string) {

    this.nombre = nombre;
    this.imagenDelante = imagenDelante;
    this.imagenDetras = imagenDetras;
    this.probabilidad = probabilidad;
    this.nivel = nivel;
    this.tengi = tengi;
  }
}
