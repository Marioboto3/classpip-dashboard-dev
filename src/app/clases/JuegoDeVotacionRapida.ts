
export class JuegoDeVotacionRapida {

    nombreJuego: string;
    tipo: string;
    clave: string;
    modoReparto: string;
    id: number;
    profesorId: number;
    conceptos: string[];
    puntos: number[];
    respuestas: any;

    // tslint:disable-next-line:max-line-length
    constructor(NombreJuego?: string, Tipo?: string, Clave?: string, ModoReparto?: string,
                profesorId?: number,  Conceptos?: string[], Puntos?: number[]) {
        this.nombreJuego = NombreJuego;
        this.tipo = Tipo;
        this.modoReparto = ModoReparto;
        this.profesorId = profesorId;
        this.clave = Clave;
        this.conceptos = Conceptos;
        this.puntos = Puntos;
        this.respuestas = [];
    }
}
