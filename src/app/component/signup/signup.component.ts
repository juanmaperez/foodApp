import { Router } from '@angular/router';
import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    user = {
      username : " ",
      email : " ",
      password : " "
    }

    signupMessage = null;
    
  constructor(
    private session: SessionService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  submitSignup(){
    this.session.signup(this.user)
      .subscribe(
        (data)=>{
          this.router.navigate(['/profile-edit']);
        }, 
        (err)=>{
          this.signupMessage = JSON.parse(err.body).message;
          console.log("msg",this.signupMessage)
        }
      )
  }

}
