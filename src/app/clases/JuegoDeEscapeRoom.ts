import { Escenario } from "./Escenario";
import { EscenarioEscapeRoom } from "./EscenarioEscapeRoom";
import { Mochila } from "./Mochila";
import { ObjetoEscape } from "./ObjetoEscape";

export class JuegoDeEscapeRoom {
  
    id: number;
    grupoId: number;
    nombreJuego: string;
    escenario: EscenarioEscapeRoom;
    modo: string;
    juegoActivo: boolean;
    tipo: string;
    estado: boolean;
    mochila: Mochila = new Mochila([], 0);
    idEscenario: number;
    escenarioSecundario: EscenarioEscapeRoom;

    constructor( modo?: string, grupoId?: number, nombreJuego?: string, escenario?: EscenarioEscapeRoom, juegoActivo?: boolean, tipo?: string, idEscenario?: number, escenarioSecundario?: EscenarioEscapeRoom) {
      this.grupoId = grupoId;
      this.escenario = escenario;
      this.nombreJuego = nombreJuego;
      this.modo = modo;
      this.juegoActivo=juegoActivo;
      this.tipo = tipo;
      this.estado = false;
      this.mochila.idJuegoDeEscapeRoom = 0;
      this.idEscenario = idEscenario;
      this.escenarioSecundario = escenarioSecundario;
    }
  }