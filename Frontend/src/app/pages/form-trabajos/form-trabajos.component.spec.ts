import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTrabajosComponent } from './form-trabajos.component';

describe('FormTrabajosComponent', () => {
  let component: FormTrabajosComponent;
  let fixture: ComponentFixture<FormTrabajosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormTrabajosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTrabajosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
