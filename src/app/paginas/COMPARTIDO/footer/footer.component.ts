import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  varSchool: string;
  varFooter: string;
  constructor() { }

  ngOnInit() {
    this.varSchool = "ub";
    this.varFooter = "contenedorFooter" + this.varSchool;
  }

}
