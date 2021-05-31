import { ObjetoEscape } from "./objetoEscape";

export class Mochila {

    objetos: ObjetoEscape [];
    idJuegoDeEscapeRoom: number;

  
    constructor(objetos?: ObjetoEscape [], idJuegoDeEscapeRoom?: number) {
  
      this.objetos = objetos;
      this.idJuegoDeEscapeRoom = idJuegoDeEscapeRoom;
  
    }
  }
  