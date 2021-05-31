import { ObjetoEnigma } from "./ObjetoEnigma";
import { ObjetoEscape } from "./objetoEscape";

export class Escenario {

    mapa: string;
    descripcion: string;
    profesorId: number;
    id: number;
    objeto1: ObjetoEscape;
    objeto2: ObjetoEscape;
    objetoEnigma: ObjetoEnigma;

    constructor(mapa?: string, descripcion?: string, objeto1?: ObjetoEscape, objeto2?: ObjetoEscape, objetoEnigma?: ObjetoEnigma){
        this.mapa = mapa;
        this.descripcion = descripcion;
        this.objeto1 = objeto1;
        this.objeto2 = objeto2;
        this.objetoEnigma = objetoEnigma;
    }
}