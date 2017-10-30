import { environment } from './../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { FormControl } from '@angular/forms';
import { SessionService } from './../../services/session.service';
import { Component, OnInit , NgZone, ViewChild} from '@angular/core';
import { FileUploader, FileSelectDirective }  from "ng2-file-upload";
import { GoogleApiService }             from './../../services/google-api.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { }                              from 'googlemaps';
import {} from '@types/googlemaps'; 

declare var google: any;


@Component({
  selector: 'update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {

  userID: any;
  host : any = {};
  allGuests : Array<Object> = [];

  baseAPI: string = 'http://localhost:3000';
  uploader: FileUploader; 

  event = {
    _id: "",
    title: "",
    description: "",
    recipe: "",
    cookingTime: 0,
    image: "",
    date: "",
    time : "",
    contribution: 0,
    address: "",
    location_lat: 0,
    location_lng: 0,
    _host: {},
    _guests: []
  }

  message: string; 

  constructor(
    private api             : ApiService,
    private router          : Router,
    private route           : ActivatedRoute,
    private session         : SessionService,
    private googleApi       : GoogleApiService,
    private _mapsAPILoader  : MapsAPILoader,
    private ngZone          : NgZone
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.getEventDetails(params.id);
    })
    
    this.userID = this.session.user._id;

    this.uploader = new FileUploader({
      url: `${this.baseAPI}/api/events/new`,
      authToken: "JWT " + this.session.token,
    });


    this.uploader.onAfterAddingFile = (file) => { console.log('file2', file) };
    
    this.uploader.onSuccessItem = (item, response) => {
      console.log('event', response);
      console.log('item', item)
      
      this.message = JSON.parse(response).message;
      
    }

    this.uploader.onErrorItem = (item, response, status, headers) => {
      console.log("response", response);
      // JSON.parse(response).message;
    }

  }

  ngAfterViewInit(){
    
    this._mapsAPILoader.load().then(() => {
        console.log(google);
        const input = document.getElementById('location');
        const autocomplete = new google.maps.places.Autocomplete(input);
        const geocoder = new google.maps.Geocoder;
      
        autocomplete.addListener('place_changed', () => {
      
          this.ngZone.run(() => {
            // get the place result
              let place = autocomplete.getPlace();
        
              if(place.place_id){

                let placeID = place.place_id;
                console.log("placeid", placeID);
                let Lng = place.geometry.location.lng();
                let Lat = place.geometry.location.lat();
                console.log("lng" , Lng);
                console.log("lng" , Lat);
                this.event.address = place.name;
                this.event.location_lat = Lat;
                this.event.location_lng = Lng;
                  
              }//RUN GEOCODER TO GET GEOMETRY DATA IF PLACE ID UNDEFINED
              else if(!place.place_id){
        
                  geocoder.geocode({'address': place.name }, function(results, status) {
                    if (status === 'OK') {
                        if(results[0]){
                            let Lat = results[0].geometry.location.lat();
                            let Lng = results[0].geometry.location.lng();
                            console.log("coordinates lat" , Lat);
                            console.log("coordinates lng" , Lng);
            
                            // STORE INFO
                            this.user.address = place.name;
                            this.event.location  = [Lat, Lng];
                            
            
                        } 
                    }
                  });
              }
            });
        });
    });
  } 



  getEventDetails(id) {
    this.api.getEvent(id)
      .subscribe((event) => {
        this.event = event;
        this.host = event._host;
        this.allGuests = event._guests;
      })
  }


}
