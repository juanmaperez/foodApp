import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCommentItemComponent } from './event-comment-item.component';

describe('EventCommentItemComponent', () => {
  let component: EventCommentItemComponent;
  let fixture: ComponentFixture<EventCommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCommentItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCommentItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
