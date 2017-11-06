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
    console.log(`${this.BASE_URL}/api/users/${id}`)
    const options = this.setHeaders()
    return this.http.get(`${this.BASE_URL}/api/users/${id}`, options )
      .map((res)=>res.json());
  }  
  



  /*============ Events Functions ==================*/


  getEventsList(){
    return this.http.get(`${this.BASE_URL}/api/events/`)
    .map((res) => res.json());
  }

  getEvent(id) {
    return this.http.get(`${this.BASE_URL}/api/events/${id}`)
      .map((res) => res.json());
  }

  removeEvent(id){
    return this.http.delete(`${this.BASE_URL}/api/events/${id}`)
      .map((res)=> res.json())
  }

  subscribeUser(userID, eventID ){
    //console.log(eventID);
    //console.log(userID);
    return this.http.put(`${this.BASE_URL}/api/events/subscribe/${eventID}`, {userID} )
      .map((res)=>res.json())
  }

  desubscribeUser(userID,eventID){
    return this.http.put(`${this.BASE_URL}/api/events/desubscribe/${eventID}`, {userID} )
    .map((res)=>res.json())
  }

  editEvent(event){
    return this.http.put(`${this.BASE_URL}/api/events/update/${event._id}`, {event})
    .map((res)=> res.json())
  }

  addComment(comment, eventID ){
    //console.log(eventID);
    //console.log(userID);
    return this.http.put(`${this.BASE_URL}/api/events/comment/${eventID}`, {comment} )
      .map((res)=>res.json())
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


 

}



