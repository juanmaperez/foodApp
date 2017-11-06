import { Component, OnInit }            from '@angular/core';
import { SessionService }               from '../../services/session.service';
import { Router }                       from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  loggedIn     : Boolean = false;
  userId       : String = "";
  mobileMenuVisible   : Boolean = false;

  constructor(
    
    private router          : Router,
    private session         : SessionService
    
   ) { }

  ngOnInit() {
  
    /*console.log("in navbar");
    if(this.session.isAuth === true){
      this.loggedIn = true;
      console.log("loggedIN")
    }else if(this.session.isAuth === false){
      console.log("loggedOut")
      this.loggedIn = false;
    }*/
    
    if(localStorage.getItem('token')!= undefined){
      this.userId = localStorage.getItem( 'user');
      if(this.userId != undefined || this.userId === ""){
        this.loggedIn = true; 
        console.log(this.loggedIn); 
      }
    } 
    else{
      this.loggedIn = false;
    }
    document.getElementById('menu-png').addEventListener("click", this.toggleMenu);
    let mobilemenu = document.getElementById('mobile-menu')
    mobilemenu.addEventListener("mouseleave", this.hideMobileMenu );  
  }

  toggleMenu(){
    console.log("toggleMenu");
    let mobilemenu = document.getElementById('mobile-menu');
    
    this.mobileMenuVisible = this.mobileMenuVisible === false ? true : false;
    if(this.mobileMenuVisible === false){
      mobilemenu.style.display = "block";
    }else if( this.mobileMenuVisible === true ){
      mobilemenu.style.display = "none";
    }

  } 
  hideMobileMenu(){
    let mobilemenu = document.getElementById('mobile-menu');
    mobilemenu.style.display = "none";
    this.mobileMenuVisible = false;
  }
  changeValueNavbar(myboolean){
    console.log("changeValuenavbar", myboolean);
    this.loggedIn = myboolean
  }

}
