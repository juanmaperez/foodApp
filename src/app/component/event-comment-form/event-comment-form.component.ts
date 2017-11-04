import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { FormControl } from '@angular/forms';
import { SessionService } from './../../services/session.service';



@Component({
  selector: 'event-comment-form',
  templateUrl: './event-comment-form.component.html',
  styleUrls: ['./event-comment-form.component.scss']
})
export class EventCommentFormComponent implements OnInit {

  @Output() 
  addCommentEvent = new EventEmitter<any>();
  
  baseAPI = environment.baseURL;
  message: String = "";

  comment:any = {
    user: {},
    comment: "",

  }

  userID: any;

  constructor(
    private api             : ApiService,
    private router          : Router,
    private session         : SessionService,
  ) { }

  ngOnInit() {

    this.userID = this.session.user._id;
    this.comment.user = this.session.user._id
    
  }

  addComment(){
    this.addCommentEvent.emit(this.comment)
  }


}
