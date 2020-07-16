import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFormacionComponent } from './list-formacion.component';

describe('ListFormacionComponent', () => {
  let component: ListFormacionComponent;
  let fixture: ComponentFixture<ListFormacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFormacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFormacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
