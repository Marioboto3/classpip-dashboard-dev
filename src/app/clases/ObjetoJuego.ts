
export class ObjetoJuego {

    id: number;
    objetoId: number;
    escenarioId: number;
    pregunta: string;
    respuesta: string;
    usable: boolean;
    recogido: boolean;
    resuelto: boolean;
    posicion: number;
    juegoDeEscapeRoomId: number;
    escenaId: number;

    constructor(objetoId?: number, escenarioId?: number, pregunta?: string, respuesta?: string, usable?: boolean, recogido?: boolean, resuelto?: boolean, posicion?: number, juegoEscapeRoomId?: number, escenaId?: number) {
  
      this.objetoId = objetoId;
      this.escenarioId = escenarioId;
      this.pregunta = pregunta;
      this.respuesta = respuesta;
      this.usable = usable;
      this.recogido = recogido;
      this.resuelto = resuelto;
      this.posicion = posicion;
      this.juegoDeEscapeRoomId = juegoEscapeRoomId;
      this.escenaId = escenaId;
      
    }
  }
  