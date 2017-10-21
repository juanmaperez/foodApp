import { environment }                  from './../../../environments/environment';
import { Router }                       from '@angular/router';
import { ApiService }                   from '../../services/api.service';
import { Component, OnInit, NgZone }    from '@angular/core';
import { SessionService }               from '../../services/session.service';
import { GoogleApiService }             from '../../services/google-api.service';
import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { }                              from 'googlemaps';


declare var google: any;

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})

export class EditProfileComponent implements OnInit {

  private BASE_URL: String = 'http://localhost:3000/api';
  
    
    userId  : any = "";
    
    url : String = `${this.BASE_URL}/imageupload/${this.userId}`;

  user = {
    username    : "",
    email       : "",
    password    : "",
    description : "",
    age         : "",
    address     : "",
    city        : "",
    address_lat : 0,
    address_lng : 0,
    host        : undefined,
    specialities: [],
    favfoods    : [],
  }

  specialities = {
   asia         : false,
   traditional  : false,
   italian      : false,
   baking       : false,
   vegan        : false,
   glutenfree   : false
  }

  favfoods = {
    asia         : false,
    traditional  : false,
    italian      : false,
    baking       : false,
    vegan        : false,
    glutenfree   : false
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

  toggleInput(list , key){
    console.log("key",key);
    
    if( list==='favfoods' ){
      this.favfoods[key] = this.favfoods[key] === false ? true : false;
      console.log("this.favfoods[key]", this.favfoods[key]);
    }else if( list==='specialities' ){
      this.specialities[key] = this.specialities[key] === false ? true : false;
      console.log("this.specs[key]", this.specialities[key]);
    }else if( list === 'user' ){
      this.user[key] = this.user[key] === false ? true : false;
      console.log("this.user[key]", this.user[key]);
    }
  }

  ngOnInit() {
   
    this.userId = this.session.user._id;
    
    /*$('input[type=checkbox]').change(function(){
      counter = 0;
      clicked = $(this).data('index');
      $('input[type=checkbox]').each(function(){
        if($(this)[0].checked){
          counter++;
        }
      });
      if(counter==3){    
        toDisable = clicked;
        while(toDisable==clicked){
          toDisable=Math.round(Math.random()*2);
        }
        $("input:eq("+toDisable+")")[0].checked = false;
      }
    });*/
    
  }

  ngAfterViewInit(){
    console.log("environment.apiKey", environment.apiKey);
    this._mapsAPILoader.load().then(() => {
        console.log(google);
        const input = document.getElementById('street');
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
                this.user.address = place.name;
                this.user.address_lat  = Lat;
                this.user.address_lng  = Lng;
                 
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
                            this.user.address_lng  = Lng;
            
                          } 
                    }
                });
              }
           });
        });
    });
  }
  
  submitProfileData(){
   console.log("inside submit")
   console.log("specialities", this.specialities)
   console.log("favfoods", this.favfoods)
    for(let key in this.favfoods){
      console.log(this.favfoods[key])
      if (this.favfoods[key] === true){ this.user.favfoods.push( key ) }
      console.log(this.user.favfoods.push)
    }
    for(let key in this.specialities){
      console.log(this.specialities[key])
      if(this.specialities[key] === true){ this.user.specialities.push( key )}
    }

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