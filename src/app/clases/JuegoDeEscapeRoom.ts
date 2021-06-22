import { Escenario } from "./Escenario";
import { EscenarioEscapeRoom } from "./EscenarioEscapeRoom";
import { Mochila } from "./Mochila";
import { ObjetoEscape } from "./ObjetoEscape";

export class JuegoDeEscapeRoom {
  
    id: number;
    grupoId: number;
    nombreJuego: string;
    modo: string;
    juegoActivo: boolean;
    tipo: string;
    estado: boolean;


    constructor( modo?: string, grupoId?: number, nombreJuego?: string, juegoActivo?: boolean, tipo?: string) {
      this.grupoId = grupoId;
      this.nombreJuego = nombreJuego;
      this.modo = modo;
      this.juegoActivo=juegoActivo;
      this.tipo = tipo;
      this.estado = false;
 
    }
  }