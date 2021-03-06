import { jwtDecode }                        from 'jwt-decode';
import { Router }                           from '@angular/router';
import { SessionService }                   from './../../services/session.service';
import { Component, OnInit, AfterViewInit, Directive }                from '@angular/core';
import { ApiService }                       from './../../services/api.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


/*declare const $:any;
@Directive({
  selector: '[callback]'
})*/

export class ProfileComponent implements OnInit, AfterViewInit {
  user: any = {};
  userId: any = "";
  imageExists     : Boolean = false;
  eventsToBeRated : Array<any>;
  events          : Array<any>;
  eventsExist     : Boolean = false;
  reviewsExist    : Boolean = false;
  reviews         : Array<any>;
  overallRating   : String = "";
  timeout         : any;

  constructor(
    private session: SessionService,
    private api    : ApiService,
    private router : Router
  ) { }

  ngOnInit() {
    this.userId = this.session.user._id;
    
  }
  
  ngAfterViewInit(){

    
    this.api.getUserData(this.userId)
    .subscribe((userdata) => {
        
        let today = Date.now();
        
        var birthdate = new Date(userdata.user.birthdate+"")
        var birthTS = new Date(userdata.user.birthdate+"").valueOf();
        
        let age = Math.floor((today - birthTS) / 1000 / 60 / 60 / 24 / 365);
                 
        //** ASSIGN USER DATA FROM API TO LOCAL USERDATA */
        this.user             = userdata.user;
        
        if(this.user.image != undefined ){
          this.imageExists = true;
        }
       
        this.eventsToBeRated  = userdata.eventsToBeRated;

        if(this.events != undefined){
          if( this.events.length > 0 ){

            this.eventsExist = true;
          }  
        }
        this.events           = userdata.events;
       
        this.reviews          = userdata.reviews;
       
        this.user.age         = age;
        
        if(this.reviews != undefined){
          if(this.reviews.length > 0){
            this.reviewsExist = true;

          }
        }
         
        let overallrating = 0;
        for(let i=0; i < this.reviews.length; i++){
         
          overallrating += this.reviews[i].puntuation;
          //let myreview = document.getElementById("review1");
          //console.log(myreview)
          //.style.width=this.reviews[i].rating;
        }

        overallrating = Math.floor((overallrating/this.reviews.length) * 100 / 5);
        let percent   = overallrating + "%";
        this.overallRating = percent;
        let overallEl = document.getElementById('overallrating');
        overallEl.style.width = percent;
      
    })    
    
  }

     
}
