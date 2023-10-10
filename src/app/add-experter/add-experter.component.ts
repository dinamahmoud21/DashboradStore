import { Component, OnInit } from '@angular/core';
import Experter from '../Interface/Experter';
import { ProductService } from '../Model/product.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../Model/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-experter',
  templateUrl: './add-experter.component.html',
  styleUrls: ['./add-experter.component.css']
})
export class AddExperterComponent implements OnInit {

   AddExpertForm!: FormGroup
  Experters:Experter=new Experter()
  submitted:boolean=false
  constructor(private FB: FormBuilder, private ProductS: ProductService, private auth: AuthService, private _router: Router ,private Toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.AddExpertForm = this.FB.group({
      ExpertName: ['' ,[Validators.required]],
      Phone: this.FB.array([
         ['' ,[Validators.required ,Validators.maxLength(11) ,Validators.minLength(11)]]
      ]),
      Address:['' ,[Validators.required]]


    })

  }
   get Phone(): FormArray {
    return this.AddExpertForm .get('Phone') as FormArray;
    

  }
  addPhone() {
    this.Phone.push(
     new FormControl()
    )
  }
  
  deleteinput(lessonIndex: number) {
    this.Phone.removeAt(lessonIndex);
}
  AddExpert() {
    this.Experters.ExpertName = this.AddExpertForm.controls['ExpertName'].value
     this.Experters.Address= this.AddExpertForm.controls['Address'].value
    this.Experters = this.AddExpertForm.value
    this.Experters.useremail=this.auth.userData.email
    console.log(this.Experters)
    this.ProductS.addExperter(this.Experters).then(() => {
      console.log("created new submit");
      this.submitted = true
      this.Toastr.success('تم الاضافة بنجاح')
      let currentUrl = this._router.url;
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate([currentUrl]);
      }
 
 
      )
 
 
    }  )
    
  
 
 
  
    
  
}
 
}


