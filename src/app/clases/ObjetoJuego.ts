
export class ObjetoJuego {

  id: number;
  objetoId: number;
  escenarioId: number;
  pregunta: string;
  respuesta: string;
  usado: boolean;
  recogido: boolean;
  resuelto: boolean;
  posicion: number;
  juegoDeEscapeRoomId: number;
  escenaId: number;
  principal: boolean;
  requerido: boolean;
  requeridoEscenaId: number;

  constructor(objetoId?: number, escenarioId?: number, pregunta?: string, respuesta?: string, usable?: boolean, recogido?: boolean, resuelto?: boolean, posicion?: number, juegoEscapeRoomId?: number, escenaId?: number, principal?: boolean, requerido?: boolean, requeridoEscenaId?:number) {

    this.objetoId = objetoId;
    this.escenarioId = escenarioId;
    this.pregunta = pregunta;
    this.respuesta = respuesta;
    this.usado = usable;
    this.recogido = recogido;
    this.resuelto = resuelto;
    this.posicion = posicion;
    this.juegoDeEscapeRoomId = juegoEscapeRoomId;
    this.escenaId = escenaId;
    this.principal = principal;
    this.requerido = requerido;
    this.requeridoEscenaId = requeridoEscenaId;
  }
}
