export class ObjetoEscape {

    nombre: string;
    usable: boolean;
    recogido: boolean;
    posicion: string;
  
    constructor(nombre?: string, usable?: boolean, recogido?: boolean, posicion?: string) {
  
      this.nombre = nombre;
      this.usable = usable;
      this.recogido = recogido;
      this.posicion = posicion;
  
    }
  }
  