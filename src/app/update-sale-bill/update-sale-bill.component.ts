import { Component, EventEmitter, OnInit ,Output  } from '@angular/core';
import SaleBill from '../Interface/SaleBill';
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
  selector: 'app-update-sale-bill',
  templateUrl: './update-sale-bill.component.html',
  styleUrls: ['./update-sale-bill.component.css']
})
export class UpdateSaleBillComponent implements OnInit {

  id: any;
  GetProduct: SaleBill | any = new SaleBill
  UpdateSaleForm!: FormGroup;
   productcategory!: Product[]

  newProduct: Product | any
  product!: Product[] |any;
  buyProduct!: SaleBill[];
  addBuyProduct: SaleBill = new SaleBill()
  GetAllBuyProduct: SaleBill[] = []
  Stores!: Stores[]
  Experter!: Experter[]
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
  BillNumber?: string;
  
  constructor(private productS: ProductService, private FB: FormBuilder, private config: NgSelectConfig, private _router: Router, private Toastr: ToastrService ,private router:ActivatedRoute ,private auth:AuthService) { 
   this.getAllProduct();
   
    this.config.notFoundText = 'لايوجد ';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
  
   
  }
 
  ngOnInit(): void {
        

  
  
  }
  ngAfterContentInit() {
    this.id = this.router.snapshot.params['id'];
    this.productS.getSaleProductById(this.id).subscribe(result => {
      this.GetProduct = result
      this.today = this.GetProduct.date
      console.log(this.GetProduct)
      this.UpdateSaleForm = this.FB.group({
        date: [this.GetProduct.date, Validators.required],
        Clientname: [this.GetProduct.Clientname, Validators.required],
        phone:[this.GetProduct.phone ],
        address:[this.GetProduct.address],
       
        BillNumber: [this.GetProduct.BillNumber, Validators.required],
      selectvalue:[this.GetProduct.selectvalue ,Validators.required],
      
        FullTotal: [this.GetProduct.FullTotal, Validators.required],
        discount: [this.GetProduct.discount, Validators.required],
        discountTotal: [this.GetProduct.discountTotal, Validators.required],
        SaleProduct: this.FB.array([] ,Validators.required)
          
          
     
    
      }
      )
      this.getBuyproductvalue()
      this.selectedvalue = this.UpdateSaleForm.controls['selectvalue'].value
      
        
      
      console.log(this.GetProduct.BuyProduct)
        
    
  
     
    
     
    }
         
    );
   
  
 
  }      
  getBuyproductvalue() {
    const control = <FormArray>this.UpdateSaleForm.get('SaleProduct');
    this.GetProduct.SaleProduct.map((element: any) => {
      control.push(this.FB.group({
            
       productcode: new FormControl(element.productcode, Validators.required),
              productname: new FormControl(element.productname, Validators.required),
              saleprice: new FormControl(element.saleprice, Validators.required),
              Totalmount: new FormControl(element.Totalmount ,Validators.required) ,
              
              mount: new FormControl(element.mount ,Validators.required),
              Total: new FormControl(element.Total ,Validators.required),
        
      }))

    })
  }
    get store() {
    
    return this.UpdateSaleForm.get('store')
  }
  

  get SaleProduct(): FormArray {
    return <FormArray>this.UpdateSaleForm.get('SaleProduct') as FormArray;
    

  }
  getProduct() {
 
}
  get SaleProductControls(): AbstractControl<FormGroup>[] {
    return (this.UpdateSaleForm.get('SaleProduct') as FormArray).controls;
    
  }
 
   getBillNumber() {
     return  this.UpdateSaleForm.controls['BillNumber'].value
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
  
 /* async getProductcat(productcat: string) {
    
    productcat = this.UpdateSaleForm.controls['productcat'].value
    this.productcat = productcat
    console.log(productcat)
    this.productcategory = await this.productS.getProductByCategoty(productcat)
    return this.productcategory
  }*/
  async selecteproduct() {
   

    this.selectedvalue = this.UpdateSaleForm.controls['selectvalue'].value
   
      
    this.selectedProduct = await this.productS.getoneProduct(this.selectedvalue);
   
    console.log(this.selectedProduct);
    this.selectedProduct.forEach((element: any) => {
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

 
  inputChanged(e: any) {
    console.log(e.target.getAttribute('formControlName')) // item_name 
  }
  
  AddBuyProduct() {
    this.addBuyProduct.phone = this.UpdateSaleForm.controls['phone'].value
     this.addBuyProduct.address = this.UpdateSaleForm.controls['address'].value
    this.addBuyProduct.Clientname = this.UpdateSaleForm.controls['Clientname'].value
    this.addBuyProduct = this.UpdateSaleForm.value;
    this.addBuyProduct.FullTotal = this.UpdateSaleForm.controls['FullTotal'].value;
    this.addBuyProduct.discount = this.UpdateSaleForm.controls['discount'].value;
    this.addBuyProduct.discountTotal = this.UpdateSaleForm.controls['discountTotal'].value

    this.addBuyProduct.date = this.today.toLocaleString()
    this.addBuyProduct.BillNumber = this.getBillNumber()
    //this.addBuyProduct.FullTotal=this.FullTotal()
    this.addBuyProduct.SaleProduct = this.UpdateSaleForm.controls['SaleProduct'].value
    console.log(this.addBuyProduct)
  this.productS.UpdateSaleProduct(this.id,this.addBuyProduct).then(() => {
      console.log('created Buy Product')
      this.addBuyProduct.SaleProduct?.forEach(
        async (el:any) => {
          this.productS.getProductname(el.productname).subscribe(data => {
            data.forEach(element => {
              this.newProduct = element.data()
              console.log(this.newProduct)
                
              
                const data = {
                  
                  mount: Number(this.newProduct.mount) + Number(el.mount),
                  price:el.price ,
                  
                  SaleMount: Number(this.newProduct.SaleMount) + Number(el.mount),


              

                  


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
      let currentUrl ='SaleReport';
      this._router.navigateByUrl('home/SaleReport', { skipLocationChange: true }).then(() => {
        this._router.navigate([currentUrl]);
      });
   
    })
  
  }
 
}


