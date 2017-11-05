import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { SessionService } from './session.service';


@Injectable()
export class ApiService {

  BASE_URL: string = environment.baseURL;
  constructor(
      private http: Http ,
      private session : SessionService
    ) { }

  setHeaders(){
    let headers = new Headers({ 'Authorization': 'JWT ' +  this.session.token });
    let options = new RequestOptions({ headers : headers });
    return options
  }

  getUserData(id){
    console.log("INSIDE API GET USERID", `${this.BASE_URL}/api/users/${id}`)
    const options = this.setHeaders()
    return this.http.get(`${this.BASE_URL}/api/users/${id}` )
      .map((res)=>res.json());
  }  
  
  editProfileData(userdata, id){
    console.log("inside editProfilData + id", id);
    console.log("userdata", userdata);
    const options = this.setHeaders();
    return this.http.put(`${this.BASE_URL}/api/users/${id}`, userdata )
      .map((res)=>res.json());
  }

  setReviewtoEvent( reviewdata, eventID ){
    console.log("inside setReview", reviewdata)
    return this.http.post(`${this.BASE_URL}/api/events/review/${eventID}`, reviewdata)
    .map((res)=>res.json());
  }

  subscribeUser(userID, eventID ){
    
    return this.http.put(`${this.BASE_URL}/api/users/subscribe2event/${eventID}`, userID )
      .map((res)=>res.json())
  }

}

