import { Component, ElementRef, OnInit, ViewChild  ,Input} from '@angular/core';
import { ProductService } from '../Model/product.service';
import Product from '../Interface/product';
 import SaleBill from '../Interface/SaleBill';
import { FormBuilder, FormGroup, FormArray, FormControl ,Validators, AbstractControl } from '@angular/forms'
import { map, Observable } from 'rxjs';
import { NgSelectConfig } from '@ng-select/ng-select';
import Stores from '../Interface/Stores';
import Experter from '../Interface/Experter';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Model/auth.service';
@Component({
  selector: 'app-sale-bill',
  templateUrl: './sale-bill.component.html',
  styleUrls: ['./sale-bill.component.css']
})
export class SaleBillComponent implements OnInit {
@Input() SaleForm!: FormGroup
productcategory! :Product[]
  productlist!: Product[];
    product!: Product[] |any;

  
  buyProduct!: SaleBill[];
  addSaleProduct: SaleBill = new SaleBill()
  GetAllBuyProduct: SaleBill[] |any = []
  Stores!: Stores[] |any
  Experter!: Experter[] |any
  selectedProduct: any | Product
  newProduct:Product |any
  selectedvalue!: string
  TotalPrice: number = 0
  fullTotal: number = 0
  mounts: number[] = []
  quantity: any
 
  selectedfulldata: Product[] = []
  today = new Date()
  currtoday: any
  BillNumber?: string
  submitted = false
  value: any
  discount: number = 0;
  productcat!: string 
 error:any
  click=false
  constructor(private productS: ProductService, private FB: FormBuilder, private config: NgSelectConfig, private _router: Router, private Toastr: ToastrService ,private auth:AuthService) {
   
    this.getAllProduct();
  
    this.getAllBuyProduct()
  
   
    
    this.config.notFoundText = 'لايوجد ';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  
   
    
  }

  ngOnInit(): void {
    
 
  this.SaleForm = this.FB.group({
    
    phone: [null ],
    address:[null ],
      Clientname: [null, Validators.required],
     
      BillNumber: [this.BillNumber, Validators.required],
      
    
      selectvalue: [null, Validators.required],
      FullTotal: [this.fullTotal, Validators.required],
      discount:[''],
      discounttotal:[],
      SaleProduct: this.FB.array(
        [], Validators.required
      
        
      )
  
    })
  
  
  }
 
  
  

  get SaleProduct(): FormArray {
    return <FormArray>this.SaleForm.get('SaleProduct') as FormArray;
    

  }
  get SaleProductControls(): AbstractControl<FormGroup>[] {
     return (this.SaleForm.get('SaleProduct') as FormArray).controls;
    
  }
 
  getBillNumber() {
    return this.BillNumber = 'SO' + Number(this.GetAllBuyProduct.length + 1)
  }
 
  addBuyproduct() {
  
  
  
  }
  Total(mount: any, price: any) {
     
    return this.TotalPrice = mount * price
   
  
    
    
  }
  totalafterDiscount(discount:number) {
    return this.fullTotal - discount
  }

  
  deleteRow(lessonIndex: number) {
    this.SaleProduct.removeAt(lessonIndex);
  }
  
   getAllProduct() {
   return new Promise<any>((resolve) => {

    this.productS.getProductByMail(this.auth.userData.email).subscribe(products => {
          resolve(products)

          console.log(products)
      this.product = products
          
        }
        )
   
  
    
      })
  

  }
  getAllBuyProduct(): void {
    this.productS.getBuyProduct().snapshotChanges().pipe(
      map(cahange =>
        cahange.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.GetAllBuyProduct = data;
      console.log(this.GetAllBuyProduct.length)
      
      this.BillNumber = 'OS' + this.GetAllBuyProduct.length
    
     
    })
    
  }
 
  async  getProductcat(productcat:string) {
    
    productcat = this.SaleForm.controls['productcat'].value
    this.productcat= productcat
    console.log(productcat)
 this.productcategory =await  this.productS.getProductByCategoty(productcat)
   return this.productcategory
  }
  async selecteproduct() {
   

    this.selectedvalue = this.SaleForm.controls['selectvalue'].value
   
      
    this.selectedProduct = await this.productS.getoneProduct(this.selectedvalue);
    
   
    console.log(this.selectedProduct);

    this.selectedProduct.forEach( (element :any) => {
     
       
        const object = this.SaleProduct.controls.find(object => {
          return object.get('productname')?.value === element.productname;
        });
  
        if (object === undefined) {
          return this.SaleProduct.push(
            this.FB.group({
              productcode: new FormControl(element.productcode, Validators.required),
              productname: new FormControl(element.productname, Validators.required),
              saleprice: new FormControl(element.saleprice, Validators.required),
              Totalmount: new FormControl(element.mount),
              
              mount: new FormControl(),
              Total: new FormControl(),
            })
          

          );
           
        
        }
        else {
          this.Toastr.error('تم ادخال المنتج من قبل')
        }
   
     
      

      
      })
      
        
        console.log(this.SaleProduct.value);
        
  
    console.log(this.selectedProduct)
  return this.SaleProduct
     
   
 

  }
    findsum(data :any){    
 
  this.fullTotal =0
 this.value=data    
  console.log(this.value);  
 for(let j=0;j<data.length;j++){   
   this.fullTotal += this.value[j].get('Total').value
   
       console.log(this.fullTotal)  
 }
 this.click=true
  return this.fullTotal    
}  

 
  inputChanged(e: any) {
    console.log(e.target.getAttribute('formControlName')) // item_name 
  }
  AddBuyProduct() {
    this.addSaleProduct.phone = this.SaleForm.controls['phone'].value
        this.addSaleProduct.address = this.SaleForm.controls['address'].value

    this.addSaleProduct.Clientname = this.SaleForm.controls['Clientname'].value
    this.addSaleProduct = this.SaleForm.value;
    this.addSaleProduct.FullTotal = this.SaleForm.controls['FullTotal'].value;
    this.addSaleProduct.discount = this.SaleForm.controls['discount'].value;
    this.addSaleProduct.discountTotal=this.SaleForm.controls['discounttotal'].value

    this.addSaleProduct.date =  this.today.toLocaleString() 
    this.addSaleProduct.BillNumber = this.getBillNumber()
    this.addSaleProduct.useremail = this.auth.userData.email
    
  
    //this.addBuyProduct.FullTotal=this.FullTotal()
    this.addSaleProduct.SaleProduct = this.SaleForm.controls['SaleProduct'].value
   
    console.log(this.addSaleProduct)
    this.productS.addSale(this.addSaleProduct).then(() => {
     this.addSaleProduct.SaleProduct?.forEach(
        async el => {
          this.productS.getProductname(el.productname).subscribe(data => {
            data.forEach(element => {
              this.newProduct = element.data()
              console.log(this.newProduct)
                
              
                const data = {
                  
                  mount: Number(this.newProduct.mount) - Number(el.mount),
                  saleMount:  Number(this.newProduct.saleMount ) + Number(el.mount)


                }
                console.log(element.id)
                this.productS.update(element.id, data).then(() => {
                  console.log('updatesuccessful')
            
          
                }).catch(err => console.log(err));
           
        
              
              
            }
       
            )
          })
        }
    )
            
    
      console.log('created Buy Product')

    }
  
    )
    this.submitted = true
    this.Toastr.success('تم الاضافة بنجاح')
    let currentUrl = this._router.url;
       this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this._router.navigate([currentUrl]);
    });
   
  }
  
 
}
