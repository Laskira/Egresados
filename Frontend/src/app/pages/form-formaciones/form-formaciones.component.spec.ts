import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFormacionesComponent } from './form-formaciones.component';

describe('FormFormacionesComponent', () => {
  let component: FormFormacionesComponent;
  let fixture: ComponentFixture<FormFormacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormFormacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFormacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
