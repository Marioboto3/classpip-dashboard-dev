import { ImagenEscenario } from "./ImagenEscenario";
export class EscenarioEscapeRoom {

    mapa: string;
    descripcion: string;
    profesorId: number;
    id: number;
    imagenId: number;

    constructor(mapa?: string, descripcion?: string, profesorId?: number, imagenId?: number){
        this.mapa = mapa;
        this.descripcion = descripcion;
        this.profesorId = profesorId;
        this.imagenId = imagenId;
    }
}