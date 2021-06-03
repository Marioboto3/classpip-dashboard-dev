import { ObjetoEnigma } from "./ObjetoEnigma";
import { ObjetoEscape } from "./objetoEscape";

export class Escenario {

    mapa: string;
    descripcion: string;
    id: number;
    profesorId:number;

    constructor(mapa?: string, descripcion?: string, id?: number, profesorId?: number){
        this.mapa = mapa;
        this.descripcion = descripcion;
        this.id = id;
        this.profesorId = profesorId;

    }
}