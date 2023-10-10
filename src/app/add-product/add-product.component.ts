import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import  catlist  from '../Interface/catlist';
import Product from '../Interface/product';
import { ProductService } from '../Model/product.service';
import {NgForm} from '@angular/forms';
import { map } from 'rxjs/operators';

import * as bootstrap from "bootstrap";
import {productimage} from '../Interface/productimage';
import { NgSelectConfig } from '@ng-select/ng-select';

import { FormBuilder, FormGroup, FormArray, FormControl ,Validators, AbstractControl } from '@angular/forms'

import { NgOption } from "@ng-select/ng-select";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable  ,finalize} from 'rxjs';
import { AuthService } from '../Model/auth.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  category: catlist = new catlist()
  addForm!:FormGroup
  cat2!: catlist[];
  form!: FormGroup;
  submitted = false;
  compname: string = ''
  addproduct: Product = new Product();
 
  currentFilesUploads?: productimage ;
  uploadfile?: productimage
  percentage = 0;
  fileUploads?: any[];
  msg = "";
  url: any;
  myValue!: string[];
    urls:any = [];
     
  currentFileUpload !: productimage;
 
files!: File[]
   randomNum = (minLen:number, maxLen:number) => 
                    +Array
                      .from(
                        {length: 0|Math.random()*(maxLen-minLen+1)+minLen},
                        () => 0|Math.random()*9+1
                      )
                      .join('')
  

  closeModalEvent: any;
  @Output() valueChange: EventEmitter<any> = new EventEmitter();
   @Input() selectedValues: any;
 container  = document.getElementById('input-cont');
   maxInputAllowed = 5;
  inputCount = 0;
  id: any;
  basePath = '/uploads';
  constructor(private productser: ProductService, private config: NgSelectConfig, private fb: FormBuilder, private _router: Router, private Toastr: ToastrService
   ,private dbupload: AngularFireDatabase, private storage: AngularFireStorage ,private auth:AuthService) {
    this.getallCategory()
 
    this.config.notFoundText = 'لايوجد ';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
     
 
  }


  ngOnInit(): void {
    this.addForm = this.fb.group({
      productcat:[null, Validators.required],
      productname: [null, Validators.required],
      productcode: [this.randomNum(5,13), Validators.required],
      saleprice: [null, Validators.required],
      buyprice: [null, Validators.required],
     
      notice: [null],
      selectedFile: this.fb.array([] ,Validators.required)
      
  
    })
    this.compname = this.constructor.name;
    this.form = this.fb.group({
      catlists: this.fb.array([''])
      
    });

    console.log(this.form);

    
  }
 get selectedFile(): FormArray {
    return <FormArray>this.addForm.get('selectedFile') as FormArray;
    

  }
   
  get Catlists(): FormArray {
    return this.form.get('catlists') as FormArray;
    

  }
  addcategory() {
    this.Catlists.push(
      new FormControl()
    );
   
    
    
  }
  removeinput(id: number) {
    this.Catlists.removeAt(id)
  }
  inputChanged(event: any) {
    console.log(event.srcElement.attributes.formcontrolname.value); //prints item_name
  }
  
  selectFile(event: any): void {
    this.files = []
     this.files.push(...event.addedFiles)
        
   

   
  }
onRemove(event:any) {
  console.log(event);
this.files.splice(this.files.indexOf(event), 1);
}
   pushFileToStorage(fileUpload: productimage): Observable<number | undefined> {
    const filePath = `${this.basePath}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);
  
    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe((downloadURL) => {
          fileUpload.url = downloadURL;

          console.log(fileUpload.url)
           this.selectedFile.push(this.fb.group({
        imageurl: new FormControl(fileUpload.url),
      })

      
      )
          fileUpload.name = fileUpload.file.name;
         this.dbupload.list(this.basePath).push(fileUpload);
        });
      })
    ).subscribe()
  
    return uploadTask.percentageChanges();
  }
  upload(): void {
   
    for (const file of this.files) {

      if (file) {
        this.currentFileUpload = new productimage(file);
        
        this.pushFileToStorage(this.currentFileUpload).subscribe(
          percentage => {
            this.percentage = Math.round(percentage ? percentage : 0);
            
          
          },
          error => {
            console.log(error);
          }
        );
        console.log(this.currentFileUpload?.url)
        
      }
      
    }
    
  }
  getallCategory(): void {
    this.productser.getAllCat().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.cat2= data
      console.log(this.cat2)
      
});
   
     
      }
  

  
  saveProduct(){
   
    console.log(  this.addproduct.productcat)
   
   
    this.addproduct = this.addForm.value
    
    this.addproduct.mount = 0
    this.addproduct.BuyMount=0

    this.addproduct.saleMount = 0
    if (this.auth.userData) {
      this.addproduct.email = this.auth.userData.email
    }

  this.addproduct.selectedFile = this.addForm.controls['selectedFile'].value
    console.log(this.addForm.controls['selectedFile'].value)
    

   
  this.productser.addproduct(this.addproduct).then(()=> {
    console.log("created new submit");
    this.submitted=true
       this.Toastr.success('تم الاضافة بنجاح')
      let currentUrl = this._router.url;
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate([currentUrl]);
      });
   
  }
 
 
  )
    
    
   
  }
  
  newproduct(): void {
    this.submitted = false;
    this.addproduct = new Product();
  }
  addnewcat() {
    
  }
  saveCatlist() {
    this.category = this.form.value as catlist
    
    
    console.log(this.category)

    this.productser.addCatlist(this.category).then(() => {
    
       
  }
  )    
  this.closeModalEvent.emit();  

}
 
        
        // Call addInput() function on button click
       
}



