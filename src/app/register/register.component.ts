import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder ,Validators } from '@angular/forms';
import { AuthService } from '../Model/auth.service';
import User from '../Interface/User';
import { Router } from '@angular/router';
import { loginphoto } from '../Interface/loginPhoto'
import { ProductService } from '../Model/product.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable  ,finalize} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm!:FormGroup
  User: User | any = new User()
   selectedFiles!: FileList |any;
  currentFileUpload !: loginphoto;
  percentage!: number;
  files !: File[]
  base2Path = '/loginphoto';
  constructor(private FB:FormBuilder ,private AuthSer:AuthService ,private router:Router ,private ProductSer:ProductService 
    ,private storage:AngularFireStorage , private dbupload:AngularFireDatabase) { }

  ngOnInit(): void {
    this.RegisterForm = this.FB.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password:['' ,Validators.required],
      confpassword:['' ,Validators.required],
     photoURL:['']
      
      
    })
  }
  register() {
     
    this.User.displayName = this.RegisterForm.controls['displayName'].value
    this.User.email=this.RegisterForm.controls['email'].value
    this.User.password = this.RegisterForm.controls['password'].value
    let confpassword = this.RegisterForm.controls['confpassword'].value
     console.log('image' + this.currentFileUpload?.url)
    this.User=this.RegisterForm.value
    this.User.photoURL = this.currentFileUpload.url
            
 console.log(this.User.photoURL)

    if (confpassword == this.User.password) {
      this.AuthSer.SignUp(this.User.email ,this.User.password , this.User.displayName ,  this.User.photoURL)
                 

    } else{

      console.log('error')
    }
    
    
  }
   pushphotoToStorage(fileUpload: loginphoto): Observable<number | undefined> {
    const filePath = `${this.base2Path}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL) => {
          fileUpload.url = downloadURL;
                    console.log(fileUpload.url)

          fileUpload.name = fileUpload.file.name;
              this.dbupload.list(this.base2Path).push(fileUpload);

        });
      })
    ).subscribe()
  
    return uploadTask.percentageChanges();
  }
   selectFile(event: any): void {
   
   this.files=[]
    this.files.push(...event.addedFiles)
  }
onRemove(event:any) {
  console.log(event);
this.files.splice(this.files.indexOf(event), 1);
}
  upload(): void {
   
    for (const file of this.files) {

      if (file) {
        this.currentFileUpload = new loginphoto(file);
        this.pushphotoToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
          },
          error => {
            console.log(error);
          }
        );
          console.log(this.currentFileUpload.url)
      }
   
    }
       

  }
   

  
}


