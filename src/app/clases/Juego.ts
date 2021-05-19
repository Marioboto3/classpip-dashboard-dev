import { Escenario } from "./Escenario";

export class Juego {
  [x: string]: any;
  tipo: string;
  modo: string;
  asignacion: string;
  juegoActivo: boolean;
  grupoId: number;
  id: number;
  numeroTotalJornadas: number;
  coleccionId: number;
  tipoJuegoCompeticion: string;
  numeroParticipantesPuntuan: number;
  puntos: number[];
  nombreJuego: string;
  puntuacionCorrecta: number;
  puntuacionIncorrecta: number;
  presentacion: string;
  juegoTerminado: boolean;
  profesorId: number;
  cuestionarioId: number;
  escenario: string;
  escenarioEscapeRoom: Escenario;

  constructor(Tipo?: string, Modo?: string, Asignacion?: string, coleccionId?: number, JuegoActivo?: boolean,
              NumeroTotalJornadas?: number, TipoJuegoCompeticion?: string, NumeroParticipantesPuntuan?: number,
              Puntos?: number[], NombreJuego?: string, PuntuacionCorrecta?: number, PuntuacionIncorrecta?: number,
              Presentacion?: string, JuegoTermiando?: boolean, profesorId?: number, cuestionarioId?: number, escenario?: string, escenarioEscapeRoom?: Escenario) {

    this.tipo = Tipo;
    this.modo = Modo;
    this.asignacion = Asignacion;
    this.juegoActivo = JuegoActivo;
    this.coleccionId = coleccionId;
    this.numeroTotalJornadas = NumeroTotalJornadas;
    this.tipoJuegoCompeticion = TipoJuegoCompeticion;
    this.numeroParticipantesPuntuan = NumeroParticipantesPuntuan;
    this.puntos = Puntos;
    this.nombreJuego = NombreJuego;
    this.puntuacionCorrecta = PuntuacionCorrecta;
    this.puntuacionIncorrecta = PuntuacionIncorrecta;
    this.presentacion = Presentacion;
    this.juegoTerminado = JuegoTermiando;
    this.profesorId = profesorId;
    this.cuestionarioId = cuestionarioId;
    this.escenario = escenario;
    this.escenarioEscapeRoom = escenarioEscapeRoom;
  }
}
