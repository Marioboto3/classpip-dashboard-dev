export class Alumno {
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  imagenPerfil: string;
  username: string;
  password: string;
  email: string;
  permisoCambioImagenPerfil: boolean;
  profesorId: number;
  id: number;

  constructor(nombre?: string, primerApellido?: string, segundoApellido?: string,
              Username?: string, Password?: string, Email?: string, profesorId?: number,
              imagenPerfil?: string) {

    this.nombre = nombre;
    this.primerApellido = primerApellido;
    this.segundoApellido = segundoApellido;
    this.imagenPerfil = null;
    this.permisoCambioImagenPerfil = false;
    this.username = Username;
    this.password = Password;
    this.email = Email;
    this.profesorId = profesorId;
  }
}
