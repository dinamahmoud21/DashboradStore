import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Model/auth.service';

@Component({
  selector: 'app-verify-enail-address',
  templateUrl: './verify-enail-address.component.html',
  styleUrls: ['./verify-enail-address.component.css']
})
export class VerifyEnailAddressComponent implements OnInit {

  constructor(public auth:AuthService) { }

  ngOnInit(): void {
  }

}
