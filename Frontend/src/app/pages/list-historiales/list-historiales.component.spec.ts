import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistorialesComponent } from './list-historiales.component';

describe('ListHistorialesComponent', () => {
  let component: ListHistorialesComponent;
  let fixture: ComponentFixture<ListHistorialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistorialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistorialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
