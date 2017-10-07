import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from '@angular/http';
import { FileSelectDirective } from "ng2-file-upload";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';

import { LayoutComponent } from './component/layout/layout.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { ApiService } from './services/api.service';
import { SessionService } from './services/session.service';

import { HeroComponent } from './component/hero/hero.component';
import { HostVsguestComponent } from './component/host-vsguest/host-vsguest.component';
import { JoinComponent } from './component/join/join.component';
import { SignupComponent } from './component/signup/signup.component';
import { Host123Component } from './component/host123/host123.component';
import { Guest123Component } from './component/guest123/guest123.component';
import { HostComponent } from './component/host/host.component';
import { JoinCommunityComponent } from './component/join-community/join-community.component'; 




// canActivate
export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
      children: [
        { path: 'hero',     component: HeroComponent,  canActivate: [ SessionService ] },
        { path: 'host/:id', component: HostComponent,     canActivate: [ SessionService ] },
      ] },
  { path: 'home',  component: HomeComponent },    
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
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
    Guest123Component, Host123Component, SignupComponent, HostComponent, JoinCommunityComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ApiService , SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
