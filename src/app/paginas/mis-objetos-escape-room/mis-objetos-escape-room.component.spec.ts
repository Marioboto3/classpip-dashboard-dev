import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisObjetosEscapeRoomComponent } from './mis-objetos-escape-room.component';

describe('MisObjetosEscapeRoomComponent', () => {
  let component: MisObjetosEscapeRoomComponent;
  let fixture: ComponentFixture<MisObjetosEscapeRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisObjetosEscapeRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisObjetosEscapeRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
