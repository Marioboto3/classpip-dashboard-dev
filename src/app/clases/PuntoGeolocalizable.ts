export class PuntoGeolocalizable {
    nombre: string;
    latitud: string;
    longitud: string;
    pistaFacil: string;
    pistaDificil: string;
    id: number;
    idescenario: number;
    profesorId: number;

    constructor(nombre?:string, latitud?: string, longitud?: string, pistafacil?: string, pistadificil?: string){
        this.nombre = nombre;
        this.latitud = latitud;
        this.longitud = longitud;
        this.pistaFacil = pistafacil;
        this.pistaDificil = pistadificil;
    }
}
