import { Component, OnInit }            from '@angular/core';
import { SessionService }               from '../../services/session.service';
import { Router }                       from '@angular/router';


@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userId       : String = "";
  mobileMenuVisible   : Boolean = false;
  isLogged : boolean

  constructor(    
    private router          : Router,
    private session         : SessionService
    
   ) { }

  ngOnInit() {

    this.session.checkLoggedIn();
    
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


}
