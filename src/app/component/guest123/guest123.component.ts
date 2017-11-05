import { Component, OnInit, Input } from '@angular/core';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NoopAnimationsModule }     from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'guest123',
  templateUrl: './guest123.component.html',
  styleUrls: ['./guest123.component.scss'],
  /*animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]*/
})
export class Guest123Component implements OnInit {

  constructor() { }
  @Input() className: string = "out";
  ngOnInit() {
  }

  /*guestState:string =  "out"

  toggle123Guest(){


    this.guestState = this.guestState === 'out' ? 'in' : 'out';
  

  }*/

}
