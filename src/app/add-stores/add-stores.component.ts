import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import { ProductService } from '../Model/product.service';
import Stores from '../Interface/Stores'
import { AuthService } from '../Model/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-stores',
  templateUrl: './add-stores.component.html',
  styleUrls: ['./add-stores.component.css']
})
export class AddStoresComponent implements OnInit {
  AddStoreForm!: FormGroup
  Stores: Stores = new Stores()
  submitted: boolean = false
  constructor(private FB: FormBuilder, private ProductS: ProductService,private _router:Router,
    private auth: AuthService, private Toastr: ToastrService) { }

  ngOnInit(): void {
    this.AddStoreForm = this.FB.group({
      storeName: ['', [Validators.required]],
      Phone: this.FB.array([
        ['', [Validators.required, Validators.minLength(11)]]
      ]),
      Address: ['', [Validators.required, Validators.email]]


    })

  }
  get Phone(): FormArray {
    return this.AddStoreForm.get('Phone') as FormArray;
    

  }
  addPhone() {
    this.Phone.push(
      new FormControl()
    )
  }
  
  deleteinput(lessonIndex: number) {
    this.Phone.removeAt(lessonIndex);
  }
  AddStore() {
    this.Stores.storeName = this.AddStoreForm.controls['storeName'].value
   
    this.Stores.Address = this.AddStoreForm.controls['Address'].value
    this.Stores = this.AddStoreForm.value
    this.Stores.useremail = this.auth.userData.email
    console.log(this.Stores)
    this.ProductS.addStores(this.Stores).then(() => {
      console.log("created new submit");
      this.submitted = true
      this.Toastr.success('تم الاضافة بنجاح')
      let currentUrl = this._router.url;
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate([currentUrl]);
      }
 
 
      )
    
  
    })
  }
}


