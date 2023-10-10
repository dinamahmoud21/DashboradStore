import { Component, EventEmitter, OnInit ,Output  } from '@angular/core';
import buyProducts from '../Interface/buyProduct';
import { ProductService } from '../Model/product.service';
import { Router ,ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl ,Validators, AbstractControl } from '@angular/forms'
import Stores from '../Interface/Stores';
import Experter from '../Interface/Experter';
import { elementAt, map, Observable } from 'rxjs';
import Product from '../Interface/product';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../Model/auth.service';
@Component({
  selector: 'app-update-buy-product',
  templateUrl: './update-buy-product.component.html',
  styleUrls: ['./update-buy-product.component.css']
})
export class UpdateBuyProductComponent implements OnInit {
  id: any;
  GetProduct: buyProducts | any = new buyProducts
  UpdateBuyForm!: FormGroup;
   productcategory!: Product[]

  newProduct: Product | any
  product!: Product[] |any;
  buyProduct!: buyProducts[];
  addBuyProduct: buyProducts = new buyProducts()
  GetAllBuyProduct: buyProducts[] = []
  Stores!: Stores[] |any
  Experter!: Experter[] |any
  selectedProduct: any | Product
  
  selectedvalue!: string
  TotalPrice: number = 0
  fullTotal: number = 0
  mounts: number[] = []
  quantity: any
 
  selectedfulldata: Product[] = []
  today = new Date()
  currtoday: any
 
  submitted = false
  value: any
  discount: number = 0;
  productcat!: string
   click = false
   addProduct?:any
  
  constructor(private productS: ProductService, private FB: FormBuilder, private config: NgSelectConfig, private _router: Router, private Toastr: ToastrService ,private router:ActivatedRoute ,private auth:AuthService) { 
   this.getAllProduct();
    this.getallStores();
    this.getAllBuyProduct()
  
    this.getallExperter()
    
    this.config.notFoundText = 'لايوجد ';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  
   
  }
 
  ngOnInit(): void {
        

  
  
  }
  ngAfterContentInit() {
    this.id = this.router.snapshot.params['id'];
    this.productS.getBuyProductById(this.id).subscribe(result => {
      this.GetProduct = result
      this.today = this.GetProduct.date
      console.log(this.GetProduct)
      this.UpdateBuyForm = this.FB.group({
        date: [this.GetProduct.date, Validators.required],
        store: [this.GetProduct.store, Validators.required],
        exportname: [this.GetProduct.exportname, Validators.required],
     
        BillNumber: [this.GetProduct.BillNumber, Validators.required],
      
     
        selectvalue: [this.GetProduct.selectvalue, Validators.required],
        FullTotal: [this.GetProduct.FullTotal, Validators.required],
        discount: [this.GetProduct.discount, Validators.required],
        discounttotal: [this.GetProduct.discountTotal, Validators.required],
        BuyProduct: this.FB.array([] ,Validators.required)
          
          
     
    
      }
      )
      this.getBuyproductvalue()
      this.selectedvalue = this.UpdateBuyForm.controls['selectvalue'].value
      
        
      
      console.log(this.GetProduct.BuyProduct)
        
    
  
     
    
     
    }
         
    );
   
  
 
  }      
  getBuyproductvalue() {
    const control = <FormArray>this.UpdateBuyForm.get('BuyProduct');
    this.GetProduct.BuyProduct.map((element: any) => {
      control.push(this.FB.group({
            
        productcode: this.FB.control(element.productcode),
        productname: this.FB.control(element.productname),
        price: this.FB.control(element.price),
        mount: this.FB.control(element.mount),
        Total: this.FB.control(element.Total),
        serial: this.FB.control(element.serial),
        
      }))

    })
  }
    get store() {
    
    return this.UpdateBuyForm.get('store')
  }
  

  get BuyProduct(): FormArray {
    return <FormArray>this.UpdateBuyForm.get('BuyProduct') as FormArray;
    

  }
  getProduct() {
 
}
  get BuyProductControls(): AbstractControl<FormGroup>[] {
    return (this.UpdateBuyForm.get('BuyProduct') as FormArray).controls;
    
  }
 
  getBillNumber() {
    return this.UpdateBuyForm.controls['BillNumber'].value
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
  getAllBuyProduct(): void {
    this.productS.getBuyProduct().snapshotChanges().pipe(
      map(cahange =>
        cahange.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.GetAllBuyProduct = data;
      console.log(this.GetAllBuyProduct.length)
      
    
     
    })
    
  }
 /* async getProductcat(productcat: string) {
    
    productcat = this.UpdateBuyForm.controls['productcat'].value
    this.productcat = productcat
    console.log(productcat)
    this.productcategory = await this.productS.getProductByCategoty(productcat)
    return this.productcategory
  }*/
  async selecteproduct() {
   

    this.selectedvalue = this.UpdateBuyForm.controls['selectvalue'].value
   
      
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

    this.productS.getStoreByMail(this.auth.userData.email).subscribe(products => {
          resolve(products)

          console.log(products)
          this.Stores =products
          
        }
        )
   
  
    
      })
  }
  ondestory() {
   
 }
  getallExperter() {
     return new Promise<any>((resolve) => {

    this.productS.getExperterByMail(this.auth.userData.email).subscribe(products => {
          resolve(products)

          console.log(products)
          this.Experter =products
          
        }
        )
   
  
    
      })
  }
  inputChanged(e: any) {
    console.log(e.target.getAttribute('formControlName')) // item_name 
  }
  
  AddBuyProduct() {
    this.addBuyProduct.store = this.UpdateBuyForm.controls['store'].value
    this.addBuyProduct.exportname = this.UpdateBuyForm.controls['exportname'].value
    this.addBuyProduct = this.UpdateBuyForm.value;
    this.addBuyProduct.FullTotal = this.UpdateBuyForm.controls['FullTotal'].value;
    this.addBuyProduct.discount = this.UpdateBuyForm.controls['discount'].value;
    this.addBuyProduct.discountTotal = this.UpdateBuyForm.controls['discounttotal'].value

    this.addBuyProduct.date = this.today.toLocaleString()
    this.addBuyProduct.BillNumber = this.getBillNumber()
    //this.addBuyProduct.FullTotal=this.FullTotal()
    this.addBuyProduct.BuyProduct = this.UpdateBuyForm.controls['BuyProduct'].value
    console.log(this.addBuyProduct)
  this.productS.updateBuyproduct(this.id,this.addBuyProduct).then(() => {
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
      let currentUrl ='BuyReport';
      this._router.navigateByUrl('home/BuyReport', { skipLocationChange: true }).then(() => {
        this._router.navigate([currentUrl]);
      });
   
    })
  
  }
 
}