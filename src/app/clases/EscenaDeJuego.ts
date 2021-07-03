
export class EscenaDeJuego {

    id: number;
    escenarioId: number;
    posicion: number;


    constructor(escenarioId?: number, posicion?: number) {
      
      this.escenarioId = escenarioId;
      this.posicion = posicion;
      
    }
  }
  