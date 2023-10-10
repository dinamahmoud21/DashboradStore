import { Injectable , NgZone} from '@angular/core';
import User from '../Interface/User';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import firebase from 'firebase/app';
import "firebase/auth";


import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import 'firebase/auth' ;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:any
  erorr:any
  constructor( public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router ,private Toastr:ToastrService ,public ngZone:NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  async SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result)
        
      
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home/SubHome']);
          }
         
        });
      })
      .catch((error) => {
        if (error.code === 'auth/internal-error' 
            ) {
          this.Toastr.error('كلمة المرور او البريد الالكتروني خظأ')
        }
       
        else{
          this.Toastr.error(error.message)
        }
      });
  }
  // Sign up with email/password
  async SignUp(email:string,password:string  ,username:string ,photourl:string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password ).then((result:any) => {
        console.log(result.user)
       
       console.log(result.user )
     
       return result.user?.updateProfile({
          displayName: username,
         photoURL: photourl,
         email: email,
        
          
        })
          .then( () => {
            this.afs.collection("users").doc(result.user?.uid).set({
              uid: result.user?.uid,
              displayName: result.user?.displayName,
             email:result.user.email,
         
             
              
              photoURL: result.user?.photoURL,
              providerId: result.user?.providerId,
            })
             this.router.navigate(['home/SubHome']);
        })
    
       
       
        
      })
      .catch((error) => {
      alert(error.message);
      });
     
  }
 
   // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['VerifyEmail']);
      });
  }
    // Reset Forggot passwordv
  async ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null ;
  }
 
 
 async  OAuthProvider(provider:any) {
        return this.afAuth.signInWithPopup(provider)
            .then((res) => {
                this.ngZone.run(() => {
                    this.router.navigate(['home/SubHome']);
                })
            }).catch((error) => {
                window.alert(error)
            })
    }

    // Firebase Google Sign-in
    SigninWithGoogle() {
        return this.OAuthProvider(new firebase.auth.GoogleAuthProvider())
            .then((res:any )=> {
                console.log('Successfully logged in!')
            }).catch(error => {
                console.log(error)
            });
    }



  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.router.navigate(['home/SubHome']);
      
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  
   // Sign out
  async SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
