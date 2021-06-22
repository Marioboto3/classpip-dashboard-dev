
export class JuegoEscenarioEscape {
  
    id: number;
    juegoEscapeRoomId: number;
    escenarioEscapeRoomId: number;


    constructor( juegoEscapeRoomId?: number, escenarioEscapeRoomId?: number ){
        this.juegoEscapeRoomId = juegoEscapeRoomId;
        this.escenarioEscapeRoomId = escenarioEscapeRoomId;

    }
  }