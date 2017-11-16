import { SessionService } from './../../services/session.service';
import { ApiService } from './../../services/api.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit, Input } from '@angular/core';
import { SlicePipe } from '@angular/common';

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  constructor(
    private session: SessionService
  ) { }
  @Input() event: any;
  
  userID:any;
  

  ngOnInit() {
    let userData = localStorage.getItem('user');
    this.userID = JSON.parse(userData)._id
    
  }

}
