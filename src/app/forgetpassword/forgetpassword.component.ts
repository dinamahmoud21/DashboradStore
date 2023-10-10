import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Model/auth.service';
import { FormGroup ,FormBuilder ,Validators } from '@angular/forms';
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
Form!: FormGroup
  email?:any ;
  constructor(private auth:AuthService ,private FB:FormBuilder) { }

  ngOnInit(): void {
    this.Form = this.FB.group({
      email: [null, Validators.required],
 
      
    })

  }
  foregetpassword() {
    this.email = this.Form.controls['email'].value 
    this.auth.ForgotPassword(this.email)
  }

}
