import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Guest123Component } from './guest123.component';

describe('Guest123Component', () => {
  let component: Guest123Component;
  let fixture: ComponentFixture<Guest123Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Guest123Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Guest123Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
