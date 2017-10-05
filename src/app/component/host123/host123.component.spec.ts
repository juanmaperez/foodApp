import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Host123Component } from './host123.component';

describe('Host123Component', () => {
  let component: Host123Component;
  let fixture: ComponentFixture<Host123Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Host123Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Host123Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
