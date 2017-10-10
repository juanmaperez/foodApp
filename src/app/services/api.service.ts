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
  
  editProfileData(userdata, id){
    console.log("inside editProfilData + id", id);
    console.log("userdata", userdata);
    const options = this.setHeaders();
    return this.http.put(`${this.BASE_URL}/api/users/${id}`, userdata)
      .map((res)=>res.json());
  }

  getList() {
    console.log("asd",this.session.token)
    let headers = new Headers({ 'Authorization': 'JWT ' +  this.session.token });
    let options = new RequestOptions({ headers : headers });
    return this.http.get(`${this.BASE_URL}/api/phones`, options)
      .map((res) => res.json());
  }

  get(id) {
    return this.http.get(`${this.BASE_URL}/api/phones/${id}`)
      .map((res) => res.json());
  }

  edit(phone) {
    return this.http.put(`${this.BASE_URL}/api/phones/${phone._id}`, phone)
      .map((res) => res.json());
  }

  remove(id) {
    return this.http.delete(`${this.BASE_URL}/api/phones/${id}`)
      .map((res) => res.json());
  }

}

