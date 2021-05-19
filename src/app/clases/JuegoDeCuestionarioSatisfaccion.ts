export class JuegoDeCuestionarioSatisfaccion {

    nombreJuego: string;
    tipo: string;
    presentacion: string;
    juegoActivo: boolean;
    juegoTerminado: boolean;
    id: number;
    profesorId: number;
    grupoId: number;
    cuestionarioSatisfaccionId: number;

    // tslint:disable-next-line:max-line-length
    constructor(NombreJuego?: string, Tipo?: string, Presentacion?: string, JuegoActivo?: boolean, JuegoTerminado?: boolean,
                profesorId?: number, grupoId?: number, cuestionarioSatisfaccionId?: number) {
        this.nombreJuego = NombreJuego;
        this.tipo = Tipo;
        this.presentacion = Presentacion;
        this.juegoActivo = JuegoActivo;
        this.juegoTerminado = JuegoTerminado;
        this.profesorId = profesorId;
        this.grupoId = grupoId;
        this.cuestionarioSatisfaccionId = cuestionarioSatisfaccionId;
    }
}
