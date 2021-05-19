export class JuegoDeCompeticion {

  numeroTotalJornadas: number;
  tipo: string;
  modo: string;
  juegoActivo: boolean;
  grupoId: number;
  id: number;

  constructor(NumeroTotalJornas?: number, Tipo?: string, Modo?: string, JuegoActivo?: boolean) {

    this.tipo = Tipo;
    this.modo = Modo;
    this.juegoActivo = JuegoActivo;
    this.numeroTotalJornadas = NumeroTotalJornas;
  }
}
