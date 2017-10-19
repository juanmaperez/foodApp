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
  selector: 'add-event-form',
  templateUrl: './add-event-form.component.html',
  styleUrls: ['./add-event-form.component.scss']
})
export class AddEventFormComponent implements OnInit {
  
  baseAPI = environment.baseURL;
  uploader: FileUploader;
  

  userID: any = "";

  event = {
    title: "",
    description : "",
    recipe : "",
    ingredients: [],
    image: "",
    date: "",
    time: "",
    cookingTime: 0,
    contribution: 0,
    _foodCategory:"ajkdfksdjkafjdlñf",
    _host: "",
    address: "",
    location : []
  }
  message: String = "";
  location: Array<number> = []

  constructor(
    private api             : ApiService,
    private router          : Router,
    private session         : SessionService,
    private googleApi       : GoogleApiService,
    private _mapsAPILoader  : MapsAPILoader,
    private ngZone          : NgZone
    ) { 



    }

  ngOnInit() {
  
    this.uploader = new FileUploader({
      url: `${this.baseAPI}/api/events/new`,
      authToken: "JWT " + this.session.token,
    });


    this.uploader.onAfterAddingFile = (file) => { console.log('file2', file) };
		this.uploader.onSuccessItem = (item, response) => {
			console.log('event', JSON.parse(response).event);
			
			this.event = JSON.parse(response).event
			
			this.message = JSON.parse(response).message;
    }

    this.uploader.onSuccessItem = (item, response) => {
      this.message = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.message = JSON.parse(response).message;
    };


    this.userID = this.session.user._id;

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
                this.event.location  = [Lat, Lng];
                  
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
      





  submitForm(){
    this.uploader.onBuildItemForm = (item, form) => {
			item.withCredentials = false;
			form.append('title', this.event.title);
			form.append('description', this.event.description);
      form.append('recipe', this.event.recipe);
      form.append('ingredients', this.event.ingredients);
			form.append('date', this.event.date);
			form.append('time', this.event.time);
			form.append('cookingTime', this.event.cookingTime);
      form.append('contribution', this.event.contribution);
      form.append('_foodCategory', this.event._foodCategory);
      form.append('_host', this.userID);
      form.append('address', this.event.address);
      form.append('location', this.event.location);
		};

    this.uploader.uploadAll();
  }

}
