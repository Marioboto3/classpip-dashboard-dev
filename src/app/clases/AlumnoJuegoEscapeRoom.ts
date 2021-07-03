
export class AlumnoJuegoEscapeRoom {

  alumnoId: number;
  personaje: string;
  juegoDeEscapeRoomId: number;
  id: number;
  escenaActualId: number;

  constructor(alumnoId?: number, personaje?:string, juegoEscapeRoomId?: number, escenaActualId?: number) {
    this.alumnoId = alumnoId;
    this.personaje = personaje;
    this.juegoDeEscapeRoomId = juegoEscapeRoomId;
    this.escenaActualId = escenaActualId;
  }
}


