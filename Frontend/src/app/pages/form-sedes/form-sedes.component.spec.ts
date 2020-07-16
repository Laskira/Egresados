import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSedesComponent } from './form-sedes.component';

describe('FormSedesComponent', () => {
  let component: FormSedesComponent;
  let fixture: ComponentFixture<FormSedesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormSedesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
