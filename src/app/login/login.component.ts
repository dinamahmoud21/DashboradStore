import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,Validators } from '@angular/forms';
import { AuthService } from '../Model/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm!: FormGroup
  email?:any ;
  password?:any
  constructor(private FB: FormBuilder ,private authSer:AuthService) { }

  ngOnInit(): void {
    this.LoginForm = this.FB.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
      
    })

  }
  login() {
    this.email = this.LoginForm.controls['email'].value
    this.password=this.LoginForm.controls['password'].value
    this.authSer.SignIn(this.email ,this.password)
  }
  loginwithgoogle() {
    this.authSer.SigninWithGoogle()
  }
}