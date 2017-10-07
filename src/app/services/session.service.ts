import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions  } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import jwtDecode from 'jwt-decode';

@Injectable()
export class SessionService implements CanActivate {
  
  //session is in appmodule so that all component can access the following three variables token, isAuth and user
  public token : String ='';
  public isAuth: boolean = false;
  public user: any = {};
  private BASE_URL: String = 'http://localhost:3000';
  constructor( private http: Http, private router: Router ) { }

  canActivate(){
    if(localStorage.getItem('token')){
      const headers = new Headers({ 'Authorization': 'JWT ' + localStorage.getItem('token')});
      const options = new RequestOptions({ headers: headers });
      return this.http.get(`${this.BASE_URL}/token`, options)
        .toPromise()
        .then((res) => res.json())
        /*Parse to JSON->This is not Angular's own design. The Angular HTTP client follows the Fetch specification for the response object returned by the Fetch function. That spec defines a json() method that parses the response body into a JavaScript object.*/
        .then((data) => {
          this.isAuth = true;
          this.user = JSON.parse( localStorage.getItem('user') );
          this.token = localStorage.getItem('token');
          return true;
        })
        .catch((err) => {
          this.router.navigate(['/login'])
          return false; 
        })
    }else{
      //this.logout()
      this.router.navigate(['/login']);
      return false;
    }

  }

  login(user){
    console.log("in login");
    return this.http.post(`${this.BASE_URL}/login`, user)
    .map((res) => res.json())
    .map((res) => {
      console.log("login success session service");
      const { token, user } = res
      console.log('token', token);

      if(token){
        this.token = token;
        this.user = { 
                      _id : user._id,
                      username: user.username
                    }

        console.log("this user", this.user);
        this.isAuth = true;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(this.user));

        return true;
      } else {
        return res;
      }
    });

  }//res => res.json().data as Query[]; WHAT DOES THIS LINE DO
  
  signup(user){
    return this.http.post(`${this.BASE_URL}/signup`, user)
      .map((res)=> res.json())
      .map((res)=>{
        const {token, user } = res
     
      if(token){
        this.token = token;
        this.user = jwtDecode(token);
        console.log(this.user)
        this.isAuth = true;
        localStorage.setItem( 'token', token);
        localStorage.setItem( user, JSON.stringify(this.user));

        return this.user

      }else{
        return false;
      }

    })
    
  }

}
