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

  

}
