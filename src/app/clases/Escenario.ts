export class Escenario {

    mapa: string;
    descripcion: string;
    id: number;
    profesorId: number;

    constructor(mapa?: string, descripcion?: string){
        this.mapa=mapa;
        this.descripcion=descripcion;
    }
}
