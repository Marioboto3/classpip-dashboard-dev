export class EquipoJuegoDeCompeticionLiga {

  puntosTotalesEquipo: number;
  equipoId: number;
  juegoDeCompeticionLigaId: number;
  id: number;

  constructor(EquipoId?: number, JuegoDeCompeticionLigaId?: number, PuntosTotalesEquipo?: number, id?: number) {

    this.equipoId = EquipoId;
    this.juegoDeCompeticionLigaId = JuegoDeCompeticionLigaId;
    this.puntosTotalesEquipo = PuntosTotalesEquipo;
    this.id = id;
  }
}
