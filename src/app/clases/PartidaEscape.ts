
export class PartidaEscape {

    id: number;
    juegoDeEscapeRoomId: number;
    escenaId: number;

    constructor(juegoEscapeRoomId?: number,  escenaId?: number) {
      
      this.juegoDeEscapeRoomId = juegoEscapeRoomId;
      this.escenaId = escenaId;
      
    }
  }
  