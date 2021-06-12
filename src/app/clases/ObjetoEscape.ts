export class ObjetoEscape {

    nombre: string;
    usable: boolean;
    recogido: boolean;
    profesorId: number;
    id: number;
    objetoId: number;

    constructor(nombre?: string, usable?: boolean, recogido?: boolean, profesorId?: number, objetoId?: number) {
  
      this.nombre = nombre;
      this.usable = usable;
      this.recogido = recogido;
      this.profesorId = profesorId;
      this.objetoId = objetoId;
  
    }
  }
  