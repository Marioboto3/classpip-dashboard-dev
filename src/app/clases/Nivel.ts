export class Nivel {

  nombre: string;
  puntosAlcanzar: number;
  privilegiosDelNivel: string;
  imagen: string;
  id: number;
  juegoDePuntosId: number;

  constructor(Nombre?: string, PuntosAlcanzar?: number, PrivilegiosDelNivel?: string, Imagen?: string, juegoDePuntosId?: number) {

    this.nombre = Nombre;
    this.puntosAlcanzar = PuntosAlcanzar;
    this.privilegiosDelNivel = PrivilegiosDelNivel;
    this.imagen = Imagen;
    this.juegoDePuntosId = juegoDePuntosId;

  }
}
