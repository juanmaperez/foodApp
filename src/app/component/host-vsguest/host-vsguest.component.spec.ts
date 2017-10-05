import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostVsguestComponent } from './host-vsguest.component';

describe('HostVsguestComponent', () => {
  let component: HostVsguestComponent;
  let fixture: ComponentFixture<HostVsguestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostVsguestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostVsguestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
