
export class EscenaDeJuego {

    id: number;
    juegoDeEscapeRoomId: number;
    posicion: number;
    escenarioId: number;

    constructor(juegoEscapeRoomId?: number, posicion?: number, escenarioId?: number) {
      
      this.juegoDeEscapeRoomId = juegoEscapeRoomId;
      this.posicion = posicion;
      this.escenarioId = escenarioId;
      
    }
  }
  