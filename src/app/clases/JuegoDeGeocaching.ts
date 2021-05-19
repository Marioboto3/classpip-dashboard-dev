export class JuegoDeGeocaching {

    nombreJuego: string;
    tipo: string;
    puntuacionCorrecta: number;
    puntuacionIncorrecta: number;
    puntuacionCorrectaBonus: number;
    puntuacionIncorrectaBonus: number;
    preguntasBasicas: number[];
    preguntasBonus: number[];
    juegoActivo: boolean;
    juegoTerminado: boolean;
    id: number;
    profesorId: number;
    grupoId: number;
    idescenario: number;

    // tslint:disable-next-line:max-line-length
    constructor(NombreJuego?: string, Tipo?: string, PuntuacionCorrecta?: number, PuntuacionIncorrecta?: number, PuntuacionCorrectaBonus?: number, PuntuacionIncorrectaBonus?: number, PreguntasBasicas?: number[], PreguntasBonus?: number[], JuegoActivo?: boolean, JuegoTerminado?: boolean, profesorId?: number, grupoId?: number, idescenario?: number) {
        this.nombreJuego = NombreJuego;
        this.tipo = Tipo;
        this.puntuacionCorrecta = PuntuacionCorrecta;
        this.puntuacionIncorrecta = PuntuacionIncorrecta;
        this.puntuacionCorrectaBonus = PuntuacionCorrectaBonus;
        this.puntuacionIncorrectaBonus = PuntuacionIncorrectaBonus;
        this.preguntasBasicas = PreguntasBasicas;
        this.preguntasBonus = PreguntasBonus;
        this.juegoActivo = JuegoActivo;
        this.juegoTerminado = JuegoTerminado;
        this.profesorId = profesorId;
        this.grupoId = grupoId;
        this.idescenario = idescenario;
    }
}
