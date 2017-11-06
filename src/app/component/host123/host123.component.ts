import { Component, OnInit, Input } from '@angular/core';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { NoopAnimationsModule }     from '@angular/platform-browser/animations';
import { trigger, state, style, transition, animate} from '@angular/animations';

@Component({
  selector: 'host123',
  templateUrl: './host123.component.html',
  styleUrls: ['./host123.component.scss'],
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
export class Host123Component implements OnInit {

  @Input() className: string = "out";

  constructor() { }

  ngOnInit() {
  }

/*  hostState:string = 'out';
  
   toggle123Host() {
     
     this.hostState = this.hostState === 'out' ? 'in' : 'out';

    }*/
}
