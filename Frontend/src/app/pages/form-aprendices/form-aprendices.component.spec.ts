import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAprendicesComponent } from './form-aprendices.component';

describe('FormAprendicesComponent', () => {
  let component: FormAprendicesComponent;
  let fixture: ComponentFixture<FormAprendicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormAprendicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAprendicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
