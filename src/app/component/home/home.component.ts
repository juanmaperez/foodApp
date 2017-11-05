import { Component, OnInit }                         from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  hostState  : string =  "out";
  guestState : string =  "out";
  
   toggle123Host($event) {
    
     this.hostState = this.hostState === 'out' ? 'in' : 'out';
     if(this.hostState === "in" && this.guestState === "in"){
       this.guestState = "out";
     }   
    }
    
    toggle123Guest($event){ 
     
        this.guestState = this.guestState === 'out' ? 'in' : 'out';
        if(this.hostState === "in" && this.guestState === "in"){
          this.hostState = "out";
        }   
     } 

}
