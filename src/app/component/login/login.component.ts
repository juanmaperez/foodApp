import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = {
    username: '',
    password: '',
  }
  message = null;
  error = null;
  
  constructor( 
    private session: SessionService,
    private router: Router) { }

  ngOnInit() {
  }

  submitLogin() {
    this.session.login(this.user)
      .subscribe(
        (data) => {
          console.log("data after login", data);
          this.router.navigate(['/hosts']);
        },
        (err) => {
          
          this.error = err;
          this.message = JSON.parse(err._body).message;
          console.log("err", typeof err._body);
        }
      )
  }

}


