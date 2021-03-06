import { AppComponent } from './../../app.component';
import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: Array<object> = [];
  userID: any;
  constructor(
    private apiService      : ApiService,
    private session         : SessionService
  ) { }

  ngOnInit() {

    this.getEvents();
      

    this.userID = this.session.user._id;
      
  }



  getEvents(){
    this.apiService.getEventsList()
    .subscribe((events)=>{
      this.events = events
    })
  }

}
