import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearObjetoEscapeRoomComponent } from './crear-objeto-escape-room.component';

describe('CrearObjetoEscapeRoomComponent', () => {
  let component: CrearObjetoEscapeRoomComponent;
  let fixture: ComponentFixture<CrearObjetoEscapeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearObjetoEscapeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearObjetoEscapeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
