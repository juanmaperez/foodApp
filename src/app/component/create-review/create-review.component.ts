import { Component, OnInit, Input } from '@angular/core';
import { ApiService }               from '../../services/api.service'

@Component({
  selector: 'create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css']
})
export class CreateReviewComponent implements OnInit {

  @Input() userId : any;
  @Input() event  : any;
  
  review = {

    title        : "",
    comment      : "",
    rating       : "",
    points       : 0

  }

  ratings= {

    star1 : false,
    star2 : false,
    star3 : false,
    star4 : false,
    star5 : false

  }

  //reviewSubmit : String ="";

  constructor(
    private api             : ApiService
  ) { }

  ngOnInit() {
    console.log("userID inside create-review-component", this.userId);
  }
  toggleStar(star){
    this.ratings[star] = this.ratings[star] === false ? true : false;
    
  }
  onSubmitReviewData(){
    let puntuation = 0;
    for(let key in this.ratings){
      console.log(this.ratings[key])
        if (this.ratings[key] === true){ 
          puntuation++;
        }
      }
      console.log("puntuation", puntuation);
      let percentage = puntuation/5 * 100;
      let points = puntuation;
      this.review.rating = percentage + "%";
      this.review.points = puntuation;
      console.log("percentage", percentage);
      console.log("review complete", this.review);
      console.log("eventID", this.event._id );
      this.api.setReviewtoEvent( this.review, this.event._id )
      .subscribe(
        (eventData)=>{
          console.log(eventData);
          //this.reviewSubmit = "Your review has been submitted";
        }, 
        (err)=>{
          console.error(err)
        }
      )
    }

}
