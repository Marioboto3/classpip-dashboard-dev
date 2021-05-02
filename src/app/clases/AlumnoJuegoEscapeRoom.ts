export class AlumnoJuegoEscapeRoom {

    alumnoId: number;
    personaje: string;
    juegoDeEscapeRoomId: number;

    constructor(alumnoId?: number, personaje?:string, juegoEscapeRoomId?: number) {
      this.alumnoId = alumnoId;
      this.personaje = personaje;
      this.juegoDeEscapeRoomId = juegoEscapeRoomId;
    }
  }
  