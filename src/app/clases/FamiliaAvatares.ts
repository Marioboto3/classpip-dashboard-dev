export class FamiliaAvatares {

  nombreFamilia: string;
  publica: boolean;
  silueta: string;
  nombreComplemento1: string;
  complemento1: string[];
  nombreComplemento2: string;
  complemento2: string[];
  nombreComplemento3: string;
  complemento3: string[];
  nombreComplemento4: string;
  complemento4: string[];
  profesorId: number;
  id: number;
  
  constructor(nombre?: string) {

    this.nombreFamilia = nombre;
    this.publica = false;

  }

}
