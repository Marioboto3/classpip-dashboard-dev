export class JuegoDeVotacionUnoATodos {
  id: number;
  tipo: string;
  grupoId: number;
  nombreJuego: string;
  modo: string;
  modoReparto: string;
  juegoActivo: boolean;
  juegoTerminado: boolean;
  puntos: number[];


  constructor(Tipo?: string, Modo?: string, ModoReparto?: string,  JuegoActivo?: boolean,
              Puntos?: number[], NombreJuego?: string,
              JuegoTerminado?: boolean, grupoId?: number) {

    this.tipo = Tipo;
    this.modo = Modo;
    this.modoReparto = ModoReparto;
    this.juegoActivo = JuegoActivo;
    this.puntos = Puntos;
    this.nombreJuego = NombreJuego;
    this.juegoTerminado = JuegoTerminado;
    this.grupoId = grupoId;
  }
}
