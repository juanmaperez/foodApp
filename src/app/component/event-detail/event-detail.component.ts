import { MapsAPILoader } from '@agm/core';
import { GoogleApiService } from './../../services/google-api.service';
import { ApiService } from './../../services/api.service';
import { SessionService } from './../../services/session.service';
import { Component, OnInit, Input, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event = {
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

  }
  constructor(
    private api             : ApiService,
    private router          : Router,
    private session         : SessionService,
    private googleApi       : GoogleApiService,
    private _mapsAPILoader  : MapsAPILoader,
    private ngZone          : NgZone
  ) { }

  ngOnInit() {
  }

  getEventDetails(id) {
    this.api.get(id)
      .subscribe((event) => {
        this.event = event;
      })
  }

}
