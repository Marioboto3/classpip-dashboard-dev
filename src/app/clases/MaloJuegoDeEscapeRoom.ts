import { Escenario } from "./Escenario";

export class MaloJuegoEscapeRoom {
    id: number;
    grupoId: number;
    NombreJuego: string;
    escenario: Escenario;
    Modo: string;
    JuegoActivo: boolean;
    Tipo: string;
  
  
    constructor( modo?: string, grupoId?: number, nombreJuego?: string, escenario?: Escenario, juegoActivo?: boolean, tipo?: string) {
      this.grupoId = grupoId;
      this.escenario = escenario;
      this.NombreJuego = nombreJuego;
      this.Modo = modo;
      this.JuegoActivo=juegoActivo;
      this.Tipo = tipo;
    }
  }