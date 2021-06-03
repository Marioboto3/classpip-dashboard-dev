import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisEscenariosEscapeRoomComponent } from './mis-escenarios-escape-room.component';

describe('MisEscenariosEscapeRoomComponent', () => {
  let component: MisEscenariosEscapeRoomComponent;
  let fixture: ComponentFixture<MisEscenariosEscapeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisEscenariosEscapeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisEscenariosEscapeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
