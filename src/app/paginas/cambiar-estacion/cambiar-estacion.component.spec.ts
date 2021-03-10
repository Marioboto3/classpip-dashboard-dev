import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarEstacionComponent } from './cambiar-estacion.component';

describe('CambiarEstacionComponent', () => {
  let component: CambiarEstacionComponent;
  let fixture: ComponentFixture<CambiarEstacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarEstacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarEstacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
