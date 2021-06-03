import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEscenarioEscapeComponent } from './crear-escenario-escape.component';

describe('CrearEscenarioEscapeComponent', () => {
  let component: CrearEscenarioEscapeComponent;
  let fixture: ComponentFixture<CrearEscenarioEscapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEscenarioEscapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEscenarioEscapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
