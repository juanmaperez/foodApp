import { GoogleApiService } from './services/google-api.service';
import { ProfileComponent } from './component/profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from "ng2-file-upload";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgmCoreModule } from '@agm/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';

import { LayoutComponent } from './component/layout/layout.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { ApiService } from './services/api.service';
import { SessionService } from './services/session.service';
import { environment } from './../environments/environment';


import { HeroComponent } from './component/hero/hero.component';
import { HostVsguestComponent } from './component/host-vsguest/host-vsguest.component';
import { JoinComponent } from './component/join/join.component';
import { SignupComponent } from './component/signup/signup.component';
import { Host123Component } from './component/host123/host123.component';
import { Guest123Component } from './component/guest123/guest123.component';
import { HostComponent } from './component/host/host.component';
import { JoinCommunityComponent } from './component/join-community/join-community.component';
import { HostsComponent } from './component/hosts/hosts.component';
import { EventsComponent } from './component/events/events.component';
import { EventComponent } from './component/event/event.component'; 
import { EventDetailComponent } from './component/event-detail/event-detail.component';
import { AddEventFormComponent } from './component/add-event-form/add-event-form.component';
import { EventsManagerComponent } from './component/events-manager/events-manager.component';


// canActivate
export const routes: Routes = [
  { path: '',         component: HomeComponent   },
  { path: 'login',    component: LoginComponent  }, 
  { path: 'signup',   component: SignupComponent },
  { path: 'profile',  component: ProfileComponent,  canActivate: [ SessionService ]  },
  { path: 'events',   component: EventsManagerComponent,
                      children: [ 
                        { path: '', component: EventsComponent },
                        { path: 'add', component: AddEventFormComponent, canActivate: [SessionService] },
                        { path: ':id', component: EventDetailComponent, canActivate: [SessionService] }] 
  },
  { path: 'hosts',    component: HostsComponent,
                      children: [ { path: ':id', component: HostComponent }] 
  },  
  { path: '**', redirectTo: '' }
  
];

/*children: [
             
        { path: 'login',  component: LoginComponent,  canActivate: [ SessionService ] },
        { path: 'signup', component: SignupComponent,     canActivate: [ SessionService ] },
      ]*/

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
    Guest123Component, Host123Component, SignupComponent, HostComponent, JoinCommunityComponent, HostsComponent, EventsComponent, EventComponent, EventDetailComponent, AddEventFormComponent, EventsManagerComponent
  ],
  imports: [
    AgmCoreModule.forRoot({ 
      apiKey: environment.googleMapsApiKey,
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ApiService , SessionService, GoogleApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
