import { Component, ElementRef, OnInit, ViewChild  ,Input} from '@angular/core';
import { ProductService } from '../Model/product.service';
import Product from '../Interface/product';
 import buyProducts from '../Interface/buyProduct';
import { FormBuilder, FormGroup, FormArray, FormControl ,Validators, AbstractControl } from '@angular/forms'
import { elementAt, map, Observable } from 'rxjs';
import { NgSelectConfig } from '@ng-select/ng-select';
import Stores from '../Interface/Stores';
import Experter from '../Interface/Experter';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Model/auth.service';
@Component({
  selector: 'app-buy-products',
  templateUrl: './buy-products.component.html',
  styleUrls: ['./buy-products.component.css']
})
export class BuyProductsComponent implements OnInit {
  BuyForm!: FormGroup
  productcategory!: Product[]

  newProduct: Product | any
  product!: Product[] |any;
  buyProduct!: buyProducts[];
  addBuyProduct: buyProducts = new buyProducts()
  GetAllBuyProduct: buyProducts[] |any = []
  Stores!: Stores[]|any
  Experter!: Experter[] |any
  selectedProduct: any | Product
  
  @Input()selectedvalue!: string
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
   click = false
   addProduct?:any
  constructor(private productS: ProductService, private FB: FormBuilder, private config: NgSelectConfig, private _router: Router, private Toastr: ToastrService ,private auth:AuthService) {
   
    this.getAllProduct();
    this.getallStores();
    this.getAllBuyProduct()
  
    this.getallExperter()
    
    this.config.notFoundText = 'لايوجد ';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  
   
    
  }

  ngOnInit(): void {
  
 
    this.BuyForm = this.FB.group({
    date:[null ,Validators.required],
      store: [null, Validators.required],
      exportname: [null, Validators.required],
     
      BillNumber: [this.BillNumber, Validators.required],
      
     
      selectvalue: [null, Validators.required],
      FullTotal: [this.fullTotal, Validators.required],
      discount: [''],
      discounttotal: [],
      BuyProduct: this.FB.array(
        [],Validators.required
      
        
      )
  
    })
  
  
  }
 
  get store() {
    
    return this.BuyForm.get('store')
  }
  

  get BuyProduct(): FormArray {
    return <FormArray>this.BuyForm.get('BuyProduct') as FormArray;
    

  }
  getProduct() {
 
}
  get BuyProductControls(): AbstractControl<FormGroup>[] {
    return (this.BuyForm.get('BuyProduct') as FormArray).controls;
    
  }
 
  getBillNumber() {
    return this.BillNumber = 'SHOP' + Number(this.GetAllBuyProduct.length + 1)
  }
 
  addBuyproduct() {
  
  
  
  }
  Total(mount: any, price: any) {
     
    return this.TotalPrice = mount * price
   
  
    
    
  }
  totalafterDiscount(discount: number) {
    return this.fullTotal - discount
  }

  
  deleteRow(lessonIndex: number) {
    this.BuyProduct.removeAt(lessonIndex);
  }
  
  getAllProduct() {
      return new Promise<any>((resolve) => {

    this.productS.getProductByMail(this.auth.userData.email).subscribe(products => {
          resolve(products)

          console.log(products)
          this.product =products
          
        }
        )
   
  
    
      })

  }
  getAllBuyProduct() {
     return new Promise<any>((resolve) => {

    this.productS.getSaleProductByMail(this.auth.userData.email).subscribe(products => {
          resolve(products)

          console.log(products)
          this.GetAllBuyProduct =products
           this.BillNumber = 'BNM' + this.GetAllBuyProduct.length
          
        }
        )
   
  
    
      })

   
    
  }
 /* async getProductcat(productcat: string) {
    
    productcat = this.BuyForm.controls['productcat'].value
    this.productcat = productcat
    console.log(productcat)
    this.productcategory = await this.productS.getProductByCategoty(productcat)
    return this.productcategory
  }*/
  async selecteproduct() {
   

    this.selectedvalue = this.BuyForm.controls['selectvalue'].value
   
      
    this.selectedProduct = await this.productS.getoneProduct(this.selectedvalue);
   
    console.log(this.selectedProduct);
    this.selectedProduct.forEach((element: any) => {
      const object = this.BuyProduct.controls.find(object => {
        return object.get('productname')?.value === element.productname;
      });
  
      if (object === undefined) {
        return this.BuyProduct.push(
          this.FB.group({
            productcode: new FormControl(element.productcode, Validators.required),
            productname: new FormControl(element.productname, Validators.required),
            price: new FormControl(),
            mount: new FormControl(),
            Total: new FormControl(),
            serial:new FormControl()
          })
          

        );
      }
      else {
        this.Toastr.error('تم ادخال المنتج من قبل')
      }
   
          
      
    })
        
    console.log(this.BuyProduct.value);
        
  
    console.log(this.selectedProduct)
    return this.BuyProduct
     
   
 

  }
  findsum(data: any) {
 
    this.fullTotal = 0
    this.value = data
    console.log(this.value);
    for (let j = 0; j < data.length; j++) {
      this.fullTotal += this.value[j].get('Total').value
   
      console.log(this.fullTotal)
    }
    this.click = true
    return this.fullTotal
  }

  getallStores() {
   return new Promise<any>((resolve) => {

    this.productS.getStoreByMail(this.auth.userData.email).subscribe(product => {
          resolve(product)

          console.log(product)
          this.Stores =product
          
        }
        )
   
  
    
      })
  }
  ondestory() {
   
 }
  getallExperter() {
  return new Promise<any>((resolve) => {

    this.productS.getExperterByMail(this.auth.userData.email).subscribe(product => {
          resolve(product)

          console.log(product)
          this.Experter =product
          
        }
        )
   
  
    
      })
  }
  inputChanged(e: any) {
    console.log(e.target.getAttribute('formControlName')) // item_name 
  }
 
  AddBuyProduct() {
    this.addBuyProduct.id
    this.addBuyProduct.store = this.BuyForm.controls['store'].value
    this.addBuyProduct.exportname = this.BuyForm.controls['exportname'].value
    this.addBuyProduct = this.BuyForm.value;
    this.addBuyProduct.FullTotal = this.BuyForm.controls['FullTotal'].value;
    this.addBuyProduct.discount = this.BuyForm.controls['discount'].value;
    this.addBuyProduct.discountTotal = this.BuyForm.controls['discounttotal'].value
    this.addBuyProduct.useremail=this.auth.userData.email
    this.addBuyProduct.date = this.today.toLocaleString()
    this.addBuyProduct.BillNumber = this.getBillNumber()
    //this.addBuyProduct.FullTotal=this.FullTotal()
    this.addBuyProduct.BuyProduct = this.BuyForm.controls['BuyProduct'].value
    console.log(this.addBuyProduct)
     this.productS.addBuyProduct(this.addBuyProduct).then(() => {
      console.log('created Buy Product')
      this.addBuyProduct.BuyProduct?.forEach(
        
        async el => {
          this.productS.getProductname(el.productname).subscribe(data => {
            data.forEach(element => {
              this.newProduct = element.data()
              console.log(this.newProduct)
                
              
                const data = {
                  
                  mount: Number(this.newProduct.mount) + Number(el.mount),
                  price:el.price ,
                  store: this.addBuyProduct.store ,
                  BuyMount: Number(this.newProduct.BuyMount) + Number(el.mount),
                  Expertname: this.addBuyProduct.exportname


              

                  


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
            
    
    
  
      
      this.submitted = true
      this.Toastr.success('تم الاضافة بنجاح')
      let currentUrl = this._router.url;
      this._router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this._router.navigate([currentUrl]);
      });
   
    })
  
  }
 
}
 