import { Mochila } from "./Mochila";

export class AlumnoJuegoEscapeRoom {

    alumnoId: number;
    personaje: string;
    juegoDeEscapeRoomId: number;
    mochila: Mochila = new Mochila([], 0);


    constructor(alumnoId?: number, personaje?:string, juegoEscapeRoomId?: number) {
      this.alumnoId = alumnoId;
      this.personaje = personaje;
      this.juegoDeEscapeRoomId = juegoEscapeRoomId;
    }
  }
  