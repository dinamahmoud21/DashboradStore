import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Model/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }
  closeMemu() {
  const myMaybeNullElement = document.getElementById('accordionSidebar')
 if (myMaybeNullElement === null) {
      console.log('error')

    } else {
      myMaybeNullElement.style.display = 'none';
    }
  }
  signout() {
    this.auth.SignOut()
  }
}
