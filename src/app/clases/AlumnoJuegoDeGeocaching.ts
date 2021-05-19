export class AlumnoJuegoDeGeocaching {

    puntuacion: number;
    etapa: number;
    id: number;
    alumnoId: number;
    juegoDeGeocachingId: number;

    constructor(Puntuacion?: number, Etapa?: number, AlumnoId?: number, juegoDeGeocaching?: number) {
        this.puntuacion = Puntuacion;
        this.etapa = Etapa;
        this.alumnoId = AlumnoId;
        this.juegoDeGeocachingId = juegoDeGeocaching;
    }
}
