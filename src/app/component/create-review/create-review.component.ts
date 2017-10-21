import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  @Input() userId : any;
  @Input() event  : any;
  
  
  constructor() { }

  ngOnInit() {
    console.log("userID inside create-review-component", this.userId);
  }

}
