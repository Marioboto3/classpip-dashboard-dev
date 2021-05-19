import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

export class JuegoDeEncuestaRapida {

    nombreJuego: string;
    tipo: string;
    clave: string;
    respuestasPreguntasAbiertas: any;
    respuestas: any;
    id: number;
    profesorId: number;
    cuestionarioSatisfaccionId: number;

    // tslint:disable-next-line:max-line-length
    constructor(NombreJuego?: string, Tipo?: string, Clave?: string,
                profesorId?: number, cuestionarioSatisfaccionId?: number) {
        this.nombreJuego = NombreJuego;
        this.tipo = Tipo;
        this.profesorId = profesorId;
        this.clave = Clave;
        this.cuestionarioSatisfaccionId = cuestionarioSatisfaccionId;
        this.respuestas = [];
    }
}
