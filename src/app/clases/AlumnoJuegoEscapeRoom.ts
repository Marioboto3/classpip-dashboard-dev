export class AlumnoJuegoEscapeRoom {

    alumnoId: number;
    personaje: string;
    juegoEscapeRoomId: number;

    constructor(alumnoId?: number, personaje?:string, juegoEscapeRoomId?: number) {
      this.alumnoId = alumnoId;
      this.personaje = personaje;
      this.juegoEscapeRoomId = juegoEscapeRoomId;
    }
  }
  