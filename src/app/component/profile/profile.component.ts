import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../services/api.service';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  userId: any = "";


  constructor(
    private session: SessionService,
    private api    : ApiService,
    private router : Router
  ) { }

  ngOnInit() {
    this.userId = this.session.user._id;
    this.api.getUserData(this.userId)
      .subscribe((userdata) => {
        this.user = userdata;
      })
  }



}
