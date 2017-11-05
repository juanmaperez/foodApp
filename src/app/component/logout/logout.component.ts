import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { Router } from '@angular/router';


@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private session: SessionService,
    private router: Router

  ) { }

  @Output() refreshNavbar = new EventEmitter();


  ngOnInit() {
    console.log("inside loguot component")
    this.session.logout();
    console.log("lougout succeeded in logout component")
    this.refreshNavbar.emit(true);
    this.router.navigate(['/']);

  }
}
