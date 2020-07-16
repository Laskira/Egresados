import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFirstComponent } from './home-first.component';

describe('HomeFirstComponent', () => {
  let component: HomeFirstComponent;
  let fixture: ComponentFixture<HomeFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
