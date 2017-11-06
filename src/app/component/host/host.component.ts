import { jwtDecode }                        from 'jwt-decode';
import { Router }                           from '@angular/router';
import { SessionService }                   from './../../services/session.service';
import { Component, OnInit }                from '@angular/core';
import { ApiService }                       from './../../services/api.service';
import { ActivatedRoute }                   from '@angular/router';


@Component({
  selector: 'host',
  templateUrl: './host.component.html',
  styleUrls: ['./host.component.scss']
})
export class HostComponent implements OnInit {
  
  user            : any = {};
  hostID          : any = "59f60fd24c46e6525d7d84e2";
  eventsToBeRated : Array<any>;
  events          : Array<any>;
  reviews         : Array<any>;
  overallRating   : String = "";
  imageExists     : Boolean = false;
  eventsExist     : Boolean = false;
  reviewsExist    : Boolean = false;
  
  constructor(
    private session: SessionService,
    private api    : ApiService,
    private router : Router,
    private route  : ActivatedRoute
  ) { }

  ngOnInit() {
    //this.userId = this.session.user._id;

      this.route.params
      .subscribe((params) => {
        this.hostID = +params['id'];
      });

    this.api.getUserData(this.hostID)
      .subscribe((userdata) => {

        // **FORMAT OF USERDATA->{ user, [eventsToBeRated], [events], [reviews] } **//
        console.log("userdata", userdata)
        console.log("userdata", userdata.user._id)
        this.user             = userdata.user;
        
        if(this.user.image != undefined ){
          this.imageExists = true;
          console.log("userimg", this.user.image)
        }

        this.eventsToBeRated  = userdata.eventsToBeRated;

        if(this.events != undefined){
          if( this.events.length > 0 ){

            this.eventsExist = true;
          }  
        }    
        
        this.events           = userdata.events;
        this.reviews          = userdata.reviews;
    
          if(this.reviews != undefined){
              if(this.reviews.length > 0){
                this.reviewsExist = true;
                let overallrating = 0;
                for(let i=0; i< this.reviews.length; i++){
                  overallrating += this.reviews[i].puntuation;
                  document.getElementById(i+"").style.width=this.reviews[i].rating;
                }
                overallrating = overallrating/this.reviews.length*100;
                let percent   = overallrating + "%";
                this.overallRating = percent;
                document.getElementById('overall-rating').style.width=percent;
              }
          }
      })
  }

}



