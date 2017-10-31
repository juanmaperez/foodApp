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
    location_lat: 0,
    location_lng: 0,
    _host: {},
    _guests: []
  }

  isJoined: boolean = false;

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
      this.getEventDetails(params.id);
    })
    
    this.userID = this.session.user._id;

    
  }

  getEventDetails(id) {
    this.api.getEvent(id)
      .subscribe((event) => {
        this.event = event;
        this.host = event._host;
        this.allGuests = event._guests;

        this.checkIsJoined(this.userID, this.allGuests)
        
      })
  }

  checkIsJoined(id,people){
    // console.log(people)
    people.forEach((person)=>{
      // console.log(person)
      if(person._id == id){
        this.isJoined = true
      }
    })
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

}
