export class JuegoDeVotacionTodosAUno {
  id: number;
  tipo: string;
  grupoId: number;
  nombreJuego: string;
  modo: string;
  juegoActivo: boolean;
  juegoTerminado: boolean;
  conceptos: string[];
  pesos: number[];


  constructor(Tipo?: string, Modo?: string, JuegoActivo?: boolean, Conceptos?: string[],
              Pesos?: number[], NombreJuego?: string,
              JuegoTerminado?: boolean, grupoId?: number) {

    this.tipo = Tipo;
    this.modo = Modo;
    this.juegoActivo = JuegoActivo;
    this.pesos = Pesos;
    this.conceptos = Conceptos;
    this.nombreJuego = NombreJuego;
    this.juegoTerminado = JuegoTerminado;
    this.grupoId = grupoId;
  }
}
