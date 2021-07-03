export class ObjetoPista {

  nombre: string;
  escenario: string;
  posicionEscenario: string;
  texto: string;
  recogida: boolean;

  constructor(nombre?: string, escenario?: string, posicionEscenario?: string, texto?: string, recogida?: boolean) {

    this.nombre = nombre;
    this.escenario = escenario;
    this.posicionEscenario = posicionEscenario;
    this.texto = texto;
    this.recogida = recogida;
    
  }
}