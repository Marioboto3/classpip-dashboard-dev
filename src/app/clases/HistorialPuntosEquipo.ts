export class HistorialPuntosEquipo {

  valorPunto: number;
  puntoId: number;
  equipoJuegoDePuntosId: number;
  id: number;
  fecha: string;

  constructor(ValorPunto?: number, puntoId?: number, equipoJuegoDePuntosId?: number, fecha?: string) {

    this.valorPunto = ValorPunto;
    this.puntoId = puntoId;
    this.equipoJuegoDePuntosId = equipoJuegoDePuntosId;
    this.fecha = fecha;
  }
}
