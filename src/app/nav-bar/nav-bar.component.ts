import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Model/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit(): void {
     
  }
  sigout() {
    this.auth.SignOut()
  }
  openMenu() {
    const myMaybeNullElement = document.getElementById('accordionSidebar')
    if (myMaybeNullElement === null) {
      console.log('error')

    } else {
      myMaybeNullElement.style.display = 'block';
    }
}

   


}
