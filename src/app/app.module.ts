//********************************* PACKAGES**************************************/
import { BrowserModule }            from '@angular/platform-browser';
import { NgModule }                 from '@angular/core';
import { FormsModule }              from '@angular/forms';
import { RouterModule, Routes }     from "@angular/router";
import { HttpModule }               from '@angular/http';
import { FileSelectDirective }      from "ng2-file-upload";
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NoopAnimationsModule }     from '@angular/platform-browser/animations';
import { AgmCoreModule }            from '@agm/core';
import { environment }              from '../environments/environment'

//********************************* SERVICES**************************************/
import { ApiService }               from './services/api.service';
import { SessionService }           from './services/session.service';
import { GoogleApiService }         from './services/google-api.service';

//********************************* COMPONENTS**************************************/
import { AppComponent }             from './app.component';
import { HomeComponent }            from './component/home/home.component';
import { LoginComponent }           from './component/login/login.component';
import { LayoutComponent }          from './component/layout/layout.component';
import { NavbarComponent }          from './component/navbar/navbar.component';
import { FooterComponent }          from './component/footer/footer.component';
import { HeroComponent }            from './component/hero/hero.component';
import { HostVsguestComponent }     from './component/host-vsguest/host-vsguest.component';
import { JoinComponent }            from './component/join/join.component';
import { SignupComponent }          from './component/signup/signup.component';
import { Host123Component }         from './component/host123/host123.component';
import { Guest123Component }        from './component/guest123/guest123.component';
import { HostComponent }            from './component/host/host.component';
import { JoinCommunityComponent }   from './component/join-community/join-community.component';
import { HostsComponent }           from './component/hosts/hosts.component';
import { EventsComponent }          from './component/events/events.component';
import { EventComponent }           from './component/event/event.component';
import { CategoriesComponent }      from './component/categories/categories.component';
import { CreateEventComponent }     from './component/create-event/create-event.component'; 
import { EditProfileComponent }     from './component/edit-profile/edit-profile.component';
import { ImageuploadComponent }     from './component/imageupload/imageupload.component'; 
import { ProfileComponent }         from './component/profile/profile.component';
import { GoogleMapComponent }       from './component/google-map/google-map.component';

// canActivate
export const routes: Routes = [
  { path: '',               component: HomeComponent   },
  { path: 'login',          component: LoginComponent  }, 
  { path: 'signup',         component: SignupComponent },
  { path: 'profile',        component: ProfileComponent,  canActivate: [ SessionService ]  },
  { path: 'profile-edit',   component: EditProfileComponent,  canActivate: [ SessionService ]  },
  { path: 'events',         component: EventsComponent, 
         children: [ { path: ':id', component: EventComponent, canActivate: [ SessionService ] }] 
  },
  { path: 'create-event',   component: CreateEventComponent, canActivate: [ SessionService ] },
  { path: 'categories',     component: CategoriesComponent },
  { path: 'hosts',          component: HostsComponent,
         children: [ { path: ':id', component: HostComponent, canActivate: [ SessionService ] }] 
  },  
  { path: '**', redirectTo: '' }
  
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    FileSelectDirective,
    HeroComponent,
    HostVsguestComponent,
    JoinComponent,
    ProfileComponent,
    Guest123Component, 
    Host123Component, 
    SignupComponent, 
    HostComponent, 
    JoinCommunityComponent, 
    HostsComponent, 
    EventsComponent, 
    EventComponent, 
    CategoriesComponent, 
    CreateEventComponent,
    EditProfileComponent,
    ImageuploadComponent,
    GoogleMapComponent,
    FileSelectDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey,
      libraries: ['places']
    })
  ],

  providers: [ApiService , SessionService, GoogleApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }


