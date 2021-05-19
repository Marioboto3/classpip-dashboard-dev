export class EnfrentamientoLiga {
  jugadorUno: number;
  jugadorDos: number;
  ganador: number;
  jornadaDeCompeticionLigaId: number;
  nombreJugadorUno: string;
  nombreJugadorDos: string;
  nombreGanador: string;
  id: number;

  constructor(JugadorUno?: number, JugadorDos?: number, Ganador?: number, JornadaDeCompeticionLigaId?: number,
              nombreJugadorUno?: string, nombreJugadorDos?: string, id?: number) {

    this.jugadorUno = JugadorUno;
    this.jugadorDos = JugadorDos;
    this.ganador = Ganador;
    this.jornadaDeCompeticionLigaId = JornadaDeCompeticionLigaId;
    if (nombreJugadorUno !== undefined && nombreJugadorDos !== undefined) {
      this.nombreJugadorUno = nombreJugadorUno;
      this.nombreJugadorDos = nombreJugadorDos;
    }
    this.id = id;
  }
}
