export class ObjetoEscape {

    nombre: string;
    usable: boolean;
    recogido: boolean;
    posicion: string;
    profesorId: number;
    id: number;
    objetoId: number;

    constructor(nombre?: string, usable?: boolean, recogido?: boolean, posicion?: string, profesorId?: number, objetoId?: number) {
  
      this.nombre = nombre;
      this.usable = usable;
      this.recogido = recogido;
      this.posicion = posicion;
      this.profesorId = profesorId;
      this.objetoId = objetoId;
  
    }
  }
  