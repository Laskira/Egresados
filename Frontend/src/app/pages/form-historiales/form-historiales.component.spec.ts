import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHistorialesComponent } from './form-historiales.component';

describe('FormHistorialesComponent', () => {
  let component: FormHistorialesComponent;
  let fixture: ComponentFixture<FormHistorialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormHistorialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormHistorialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
