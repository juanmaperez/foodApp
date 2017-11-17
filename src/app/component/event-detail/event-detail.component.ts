import { Observable } from 'rxjs/Rx';
import { EventCommentFormComponent } from './../event-comment-form/event-comment-form.component';
import { routes } from './../../app.module';
import { MapsAPILoader } from '@agm/core';
import { GoogleApiService } from './../../services/google-api.service';
import { ApiService } from './../../services/api.service';
import { SessionService } from './../../services/session.service';
import { Component, OnInit, Input, NgZone, HostBinding } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SlicePipe } from '@angular/common';


@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  userID: any;
  host : any = {};
  allGuests : Array<Object> = [];
  comments : Array<Object> = [];

  event = {
    _id: "",
    title: "",
    description: "",
    recipe: "",
    cookingTime: 0,
    image: "",
    date: "",
    time : "",
    contribution: 0,
    address: "",
    places: 0,
    city:"",
    location_lat: 0,
    location_lng: 0,
    _host: {},
    _guests: []
  }

  isJoined: boolean = undefined;

  message_comment : string = "";

  @HostBinding('class.event-wrapper') someField: boolean = true;
  
  constructor(
    private api             : ApiService,
    private router          : Router,
    private route           : ActivatedRoute,
    private session         : SessionService,
    private googleApi       : GoogleApiService,
    private _mapsAPILoader  : MapsAPILoader,
    private ngZone          : NgZone
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getEventDetails(params.id)     
    })
    
    this.userID = this.session.user._id;
    this.checkIsJoined(this.userID, this.allGuests)
    
   
  }
  
  getEventDetails(id) {
    this.api.getEvent(id)
      .subscribe((event) => {
        this.event = event;
        this.host = event._host;
        this.allGuests = event._guests;
        this.comments = event.comments;
        // console.log(this.comments)
        this.checkIsJoined(this.userID, this.allGuests)
        // console.log(typeof this.userID);
         //console.log( this.host._id);
        
      })
  }



  checkIsJoined(id,people){
    if(people.length == 0){
      return this.isJoined = false;
    } else {
      for(var i=0; i<people.length; i++){
        if(people[i]._id == id){
        
          return this.isJoined = true
        } else {
           this.isJoined = false; 
        }
      }
    }
    //console.log(this.event.places)
  }

  delete() {
    this.api.removeEvent(this.event._id)
      .subscribe(() => {
        this.router.navigate(['/events'])
      })
  }

  subscribeUser(){
    this.api.subscribeUser( this.userID, this.event._id)
      
      .subscribe((response)=>{
        this.event = response.event;

        this.getEventDetails(this.event._id);      
        
      })
  }


  desubscribeUser(){
    this.api.desubscribeUser( this.userID, this.event._id)
      
      .subscribe((response)=>{
        this.event = response.event;

        this.getEventDetails(this.event._id);
    
        
      })
  }

  addComment(comment){
    this.api.addComment(comment, this.event._id)
      .subscribe((response)=>{
        // console.log(response)
        this.event = response.event;
        this.message_comment = response.message;

        this.getEventDetails(response.event._id);
        
      })
  }

}
