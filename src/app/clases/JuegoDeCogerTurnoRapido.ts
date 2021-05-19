export class JuegoDeCogerTurnoRapido {

    nombreJuego: string;
    tipo: string;
    presentacion: string;
    clave: string;
    id: number;
    profesorId: number;
    turnos: any[];


    // tslint:disable-next-line:max-line-length
    constructor(NombreJuego?: string, Tipo?: string, Clave?: string,
                profesorId?: number,  Presentacion?: string, Turnos?: any[]) {
        this.nombreJuego = NombreJuego;
        this.tipo = Tipo;
        this.profesorId = profesorId;
        this.clave = Clave;
        this.presentacion = Presentacion;
        this.turnos = Turnos;
    }
}
