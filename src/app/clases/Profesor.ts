export class Profesor {

  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  username: string;
  email: string;
  password: string;
  imagenPerfil: string;
  estacion: string;
  identificador: string;
  id: number;

  constructor(  Nombre?: string, PrimerApellido?: string, SegundoApellido?: string,
                username?: string, Estacion?: string, email?: string, Password?: string, ImagenPerfil?: string,
                Identificador?: string,
                id?: number) {

    this.nombre = Nombre;
    this.primerApellido = PrimerApellido;
    this.segundoApellido = SegundoApellido;
    this.username = username;
    this.email = email;
    this.password = Password;
    this.imagenPerfil = ImagenPerfil;
    this.identificador = Identificador;
    this.id = id;
    this.estacion = Estacion;
  }

}



  