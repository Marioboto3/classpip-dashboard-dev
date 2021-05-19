export class JuegoDeAvatar {

  nombreJuego: string;
  tipo: string;
  modo: string;
  juegoActivo: boolean;
  familias: number[];
  criteriosPrivilegioComplemento1: string;
  criteriosPrivilegioComplemento2: string;
  criteriosPrivilegioComplemento3: string;
  criteriosPrivilegioComplemento4: string;
  criteriosPrivilegioVoz: string;
  criteriosPrivilegioVerTodos: string;
  id: number;
  grupoId: number;

  constructor( NombreJuego?: string, Tipo?: string, Modo?: string, JuegoActivo?: boolean) {

    this.tipo = Tipo;
    this.modo = Modo;
    this.juegoActivo = JuegoActivo;
    this.nombreJuego = NombreJuego;
  }
}
