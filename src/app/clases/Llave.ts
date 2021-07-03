

export class Llave {

  nombre: string;
  recogido: boolean;
  escenaId: number;
  juegoDeEscapeRoomId: number;
  id: number;
  objetoGlobalId: number;
  objetoJuegoId: number;
  tipo: string;

 // peso: number;

  constructor(nombre?: string, recogido?: boolean, escenaId?: number, juegoEscapeRoomId?: number, objetoGlobalId?: number, objetoJuegoId?: number, tipo?: string) {

    this.nombre = nombre;
    this.recogido = recogido;
    this.escenaId = escenaId;
    this.juegoDeEscapeRoomId = juegoEscapeRoomId;
    this.objetoGlobalId = objetoGlobalId;
    this.objetoJuegoId = objetoJuegoId;
    this.tipo = tipo;

  }
}
