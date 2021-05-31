import { Escenario } from "./Escenario";
import { Mochila } from "./Mochila";
import { ObjetoEscape } from "./ObjetoEscape";

export class JuegoDeEscapeRoom {
  
    id: number;
    grupoId: number;
    nombreJuego: string;
    escenario: Escenario;
    modo: string;
    juegoActivo: boolean;
    tipo: string;
    estado: boolean;
    mochila: Mochila = new Mochila([], 0);
  
  
    constructor( modo?: string, grupoId?: number, nombreJuego?: string, escenario?: Escenario, juegoActivo?: boolean, tipo?: string) {
      this.grupoId = grupoId;
      this.escenario = escenario;
      this.nombreJuego = nombreJuego;
      this.modo = modo;
      this.juegoActivo=juegoActivo;
      this.tipo = tipo;
      this.estado = false;
      this.mochila.idJuegoDeEscapeRoom = 0;
    }
  }