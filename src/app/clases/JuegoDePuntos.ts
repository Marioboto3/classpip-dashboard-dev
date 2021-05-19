export class JuegoDePuntos {

  nombreJuego: string;
  tipo: string;
  modo: string;
  juegoActivo: boolean;
  id: number;
  profesorId: number;
  grupoId: number;

  constructor( NombreJuego?: string, Tipo?: string, Modo?: string, JuegoActivo?: boolean,
               profesorId?: number, grupoId?: number) {

    this.tipo = Tipo;
    this.modo = Modo;
    this.nombreJuego = NombreJuego;
    this.juegoActivo = JuegoActivo;
    this.profesorId = profesorId;
    this.grupoId = grupoId;
  }
}
