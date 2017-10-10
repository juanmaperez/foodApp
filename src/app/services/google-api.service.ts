import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SessionService } from './session.service';


@Injectable()
export class GoogleApiService {



  constructor(
    private http: Http ,
    private session : SessionService

  ) { }

  /*callGoogleApi(){
    console.log("calling googleApi");
    return this.http.get("https://maps.googleapis.com/maps/api/js?key=AIzaSyCH9a2tBZIX_OwjIziNi3a62tR1Z-ScO-k&libraries=places&callback=onGoogleApiReady")
  }*/

}
