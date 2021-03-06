import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Host123Component }                        from '../../component/host123/host123.component';
import { Guest123Component }                       from '../../component/guest123/guest123.component';
import { BrowserAnimationsModule }                 from '@angular/platform-browser/animations';
import { NoopAnimationsModule }                    from '@angular/platform-browser/animations';

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
  styleUrls: ['./host-vsguest.component.scss'],
  providers: [ Host123Component , Guest123Component ]
})
export class HostVsguestComponent implements OnInit {

  constructor( private host123: Host123Component, private guest123: Guest123Component ) { }
  
  ngOnInit() {
    //let state;
  }

  @Output() guestClickEvent = new EventEmitter();
  @Output() hostClickEvent  = new EventEmitter();

  onClickButtonHost(event){
    console.log("emitting event");
    this.hostClickEvent.emit("host")
  }
  onClickButtonGuest(event){
    console.log("emitting event");
    this.guestClickEvent.emit("guest")
  }

}
