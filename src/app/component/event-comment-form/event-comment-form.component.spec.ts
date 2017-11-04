import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCommentFormComponent } from './event-comment-form.component';

describe('EventCommentFormComponent', () => {
  let component: EventCommentFormComponent;
  let fixture: ComponentFixture<EventCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
