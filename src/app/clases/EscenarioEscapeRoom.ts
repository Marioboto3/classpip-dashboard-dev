import { ImagenEscenario } from "./ImagenEscenario";
import { ObjetoEnigma } from "./ObjetoEnigma";
import { ObjetoEscape } from "./objetoEscape";
import { ObjetoGlobalEscape } from "./ObjetoGlobalEscape";

export class EscenarioEscapeRoom {

    mapa: string;
    descripcion: string;
    profesorId: number;
    id: number;
    objetos: ObjetoGlobalEscape [];
    imagen: ImagenEscenario;

    constructor(mapa?: string, descripcion?: string,  objetos?: ObjetoGlobalEscape[], imagen?: ImagenEscenario){
        this.mapa = mapa;
        this.descripcion = descripcion;
        this.objetos = objetos;
        this.imagen = imagen;
    }
}