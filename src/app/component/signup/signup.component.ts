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

    message = null;
    
  constructor(
    private session: SessionService,
    private router : Router
  ) { }

  ngOnInit() {
  }

  submitSignup(){
    console.log("hola")
    this.session.signup(this.user)
      .subscribe(
        (data)=>{
          console.log("data info", data);
          this.router.navigate(['/profile']);
        }, 
        (err)=>{
          this.message = JSON.parse(err.body).message;
        }
      )
  }

}
