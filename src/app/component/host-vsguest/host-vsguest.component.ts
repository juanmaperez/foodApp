import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'host-vs-guest',
  templateUrl: './host-vsguest.component.html',
  styleUrls: ['./host-vsguest.component.scss']
})
export class HostVsguestComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
    //let state;
  }

  toggle123guest(){
    //this.state = this.state === 'active' ? 'inactive' : 'active';

  }

  toggle123host(){


  }

}
