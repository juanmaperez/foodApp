import { Router }                       from '@angular/router';
import { ApiService }                   from './../../services/api.service';
import { Component, OnInit, NgZone }    from '@angular/core';
import { SessionService }               from './../../services/session.service';
import { GoogleApiService }             from './../../services/google-api.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { }                              from 'googlemaps';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  userId  : any = "";

  user = {
    username : "",
    email : "",
    password : "",
    description: "",
    age: "",
    address: "",
    city: "",
    address_lat: 0,
    address_lng: 0 
  }

  message = null;
  
  constructor(
    private api             : ApiService,
    private router          : Router,
    private session         : SessionService,
    private googleApi       : GoogleApiService,
    private _mapsAPILoader  : MapsAPILoader,
    private ngZone          : NgZone
  ) { }

  ngOnInit() {
   
    this.userId = this.session.user._id;
    
  }

  ngAfterViewInit(){

    this._mapsAPILoader.load().then(() => {
        let google:   any = {};
        let geocoder: any = {};
        console.log(google);
        const input = document.getElementById('street');
        const autocomplete = new google.maps.places.Autocomplete(input);
        geocoder = new google.maps.Geocoder;
      
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
                this.user.address = place.name;
                this.user.address_lat  = Lat;
                this.user.address_lat  = Lng;
                 
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
                            this.user.address_lat  = Lat;
                            this.user.address_lat  = Lng;
            
                          } 
                    }
                });
              }
           });
        });
    });
  }
  
  submitProfileData(){
    console.log("inside submit");
    this.api.editProfileData(this.user, this.userId)
      .subscribe(
        (userdata)=>{
          console.log(userdata);
        }, 
        (err)=>{
          this.message = JSON.parse(err.body).message;
        }
      )
  }
  
}
