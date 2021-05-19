export class FamiliaDeImagenesDePerfil {

  nombreFamilia: string;
  numeroImagenes: number;
  imagenes: string[];
  publica: boolean;
  profesorId: number;
  id: number;

  constructor(nombreFamilia?: string, numeroImagenes?: number, imagenes?: string[]) {
    this.nombreFamilia = nombreFamilia;
    this.numeroImagenes = numeroImagenes;
    this.imagenes = imagenes;
    this.publica = false;
  }
}
