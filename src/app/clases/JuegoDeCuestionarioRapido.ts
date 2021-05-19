export class JuegoDeCuestionarioRapido {

    nombreJuego: string;
    tipo: string;
    clave: string;
    puntuacionCorrecta: number;
    puntuacionIncorrecta: number;
    tiempoLimite: number;
    presentacion: string;
    juegoActivo: boolean;
    juegoTerminado: boolean;
    id: number;
    profesorId: number;
    cuestionarioId: number;
    respuestas: any;

    // tslint:disable-next-line:max-line-length
    constructor(NombreJuego?: string, Tipo?: string,  Clave?: string, PuntuacionCorrecta?: number, PuntuacionIncorrecta?: number, Presentacion?: string, JuegoActivo?: boolean, JuegoTerminado?: boolean,
                profesorId?: number, cuestionarioId?: number,
                TiempoLimite?: number) {
        this.nombreJuego = NombreJuego;
        this.tipo = Tipo;
        this.clave = Clave;
        this.puntuacionCorrecta = PuntuacionCorrecta;
        this.puntuacionIncorrecta = PuntuacionIncorrecta;
        this.presentacion = Presentacion;
        this.juegoActivo = JuegoActivo;
        this.juegoTerminado = JuegoTerminado;
        this.profesorId = profesorId;
        this.cuestionarioId = cuestionarioId;
        this.tiempoLimite = TiempoLimite;
        this.respuestas = [];
    }
}
