
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
  
    eventsToBeRated : any = undefined;  

    userId  : any = "";

    writeReviews : boolean = false;
    
    url : String;
    
    submitMessage : String = ""; 

    user = {
      username    : "",
      email       : "",
      description : "",
      birthdate   : undefined,
      address     : "",
      city        : "",
      address_lat : 0,
      address_lng : 0,
      specialities: [],
      favfoods    : []
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
      
      if( list === 'favfoods' ){
        this.favfoods[key] = this.favfoods[key] === false ? true : false;
        
      }else if( list === 'specialities' ){
        this.specialities[key] = this.specialities[key] === false ? true : false;
        this.user[key] = this.user[key] === false ? true : false;
        
      }
    }

    ngOnInit() {
    //FORMATO USERDATA ({ user, eventsToBeRated, reviews  }
    
      this.userId = this.session.user._id;
      this.url = `${this.BASE_URL}/imageupload/${this.userId}`;
      this.api.getUserData( this.userId )
      .subscribe(
        (userdata)=>{
          console.log("userdata in ngOnInit", userdata);
          // SET USERDATA IF USER HAS ANY STORED in DB //
          this.eventsToBeRated      = userdata.user.eventsToBeRated;
          this.user.username        = userdata.user.username;
          this.user.email           = userdata.user.email;
          this.user.description     = userdata.user.description;
          this.user.birthdate       = userdata.user.birthdate;
          this.user.address         = userdata.user.address;
          this.user.city            = userdata.user.city;

          if( userdata.user._foodSpecialities != undefined){
            this.user.specialities    = userdata.user._foodSpecialities;
          }
          if( userdata.user._foodInterests != undefined){
            this.user.favfoods        = userdata.user._foodInterests;
          }
          
          let specialites = userdata.user._foodSpecialities;
          console.log("myspecs", specialites);
          if(specialites != undefined){
            console.log( "in myspecs" )
            for(let i=0; i < specialites.length; i++){
              this.specialities[specialites[i]] = true;
            }
          }
          let favfoods = userdata.user._foodInterests;
          if(favfoods != undefined ){
            console.log( "in favfoods")
            for(let i=0; i < favfoods.length; i++){
              this.favfoods[favfoods[i]] = true;
            }
          }
        
          // SET BOOLEAN FLAG TO TRUE IN EDIT PROFILE HTML TO DISPLAY REVIEW MODULE //
          if( userdata.eventsToBeRated.length > 0 ){
            this.writeReviews = true;
          }
          
        }, 
        (err)=>{
          this.message = JSON.parse(err.body).message;
        }
      )
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
                  
                }
                //RUN GEOCODER TO GET GEOMETRY DATA IF PLACE ID UNDEFINED
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
     
     //*** check if main fields are empty ***// 
      if( this.user.username === "" || this.user.username === "" || this.user.email === "" || this.user.description==="" || this.user.birthdate==="" || this.user.city ===""){
        this.submitMessage = "Please fill in all fields";
        return;
      }

      //*** check if email field is correct format ***//
      let emailRegEx = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;
      let result = emailRegEx.test(this.user.email);      
      if( !result ){
        this.submitMessage = "Please fill in a correct email address";
        return;
      }

      //*** Reset user.FAVFOODS &  user.SPECIALITES to empty array to avoid double entries on multiple submits ***//
        if(this.user.favfoods.length > 0){
          this.user.favfoods = [];
          console.log("this.user.favfoods", this.user.favfoods);
        }
        if(this.user.specialities.length > 0){
          this.user.specialities = [];
          console.log(this.user.specialities);
        }

      //*** Get all favfoods items with boolean true and push them to main user object ***//
      for(let key in this.favfoods){
        if (this.favfoods[key] === true){ this.user.favfoods.push( key ) }  
      }
      for(let key in this.specialities){   
        if(this.specialities[key] === true){ this.user.specialities.push( key )}
      }

      //*** make call to apiservice to update userdata in DB ***//
      this.api.editProfileData(this.user, this.userId)
        .subscribe(
          (userdata)=>{
            console.log(userdata);
            this.submitMessage = "Data saved correctly"
          }, 
          (err)=>{
            this.message = JSON.parse(err.body).message;
            this.submitMessage = "Please try again, something went wrong"
          }
        )
    } 

  }

