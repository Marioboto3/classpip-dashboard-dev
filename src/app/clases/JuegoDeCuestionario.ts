export class JuegoDeCuestionario {

    nombreJuego: string;
    tipo: string;
    modalidad: string;
    puntuacionCorrecta: number;
    puntuacionIncorrecta: number;
    tiempoLimite: number;
    presentacion: string;
    juegoActivo: boolean;
    juegoTerminado: boolean;
    id: number;
    profesorId: number;
    grupoId: number;
    cuestionarioId: number;

    // tslint:disable-next-line:max-line-length
    constructor(NombreJuego?: string, Tipo?: string, Modalidad?: string, PuntuacionCorrecta?: number, PuntuacionIncorrecta?: number, Presentacion?: string, JuegoActivo?: boolean, JuegoTerminado?: boolean,
                profesorId?: number, grupoId?: number, cuestionarioId?: number,
                TiempoLimite?: number) {
        this.nombreJuego = NombreJuego;
        this.tipo = Tipo;
        this.modalidad = Modalidad;
        this.puntuacionCorrecta = PuntuacionCorrecta;
        this.puntuacionIncorrecta = PuntuacionIncorrecta;
        this.presentacion = Presentacion;
        this.juegoActivo = JuegoActivo;
        this.juegoTerminado = JuegoTerminado;
        this.profesorId = profesorId;
        this.grupoId = grupoId;
        this.cuestionarioId = cuestionarioId;
        this.tiempoLimite = TiempoLimite;
    }
}
