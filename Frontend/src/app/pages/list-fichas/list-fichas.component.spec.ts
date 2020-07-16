import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFichasComponent } from './list-fichas.component';

describe('ListFichasComponent', () => {
  let component: ListFichasComponent;
  let fixture: ComponentFixture<ListFichasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFichasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFichasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
