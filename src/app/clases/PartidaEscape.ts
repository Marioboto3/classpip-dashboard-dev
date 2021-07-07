
export class PartidaEscape {

    id: number;
    juegoDeEscapeRoomId: number;
    escenaId: number;
    posicion: number;

    constructor(juegoEscapeRoomId?: number,  escenaId?: number, posicion?: number) {
      
      this.juegoDeEscapeRoomId = juegoEscapeRoomId;
      this.escenaId = escenaId;
      this.posicion = posicion;
      
    }
  }
  