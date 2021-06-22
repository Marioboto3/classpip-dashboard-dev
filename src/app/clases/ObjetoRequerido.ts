export class ObjetoRequerido {

    id: number;
    objetoId: number;
    recogido: boolean;
    juegoDeEscapeRoomId: number;
    escenaId: number;
    usado: boolean;

    constructor(objetoId?: number, recogido?: boolean, juegoEscapeRoomId?: number, escenaId?: number, usado?: boolean) {
  
      this.objetoId = objetoId;
      this.recogido = recogido;
      this.juegoDeEscapeRoomId = juegoEscapeRoomId;
      this.escenaId = escenaId;
      this.usado = usado;
      
    }
  }
  