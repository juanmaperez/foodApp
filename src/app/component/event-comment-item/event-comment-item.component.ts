import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'event-comment-item',
  templateUrl: './event-comment-item.component.html',
  styleUrls: ['./event-comment-item.component.scss']
})
export class EventCommentItemComponent implements OnInit {
  
  @Input() comment: any;

  constructor() { }

  ngOnInit() {
  }

}
