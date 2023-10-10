import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../Model/product.service';
import { map, Observable } from 'rxjs';
import {Subject} from 'rxjs';
import Swal from 'sweetalert2';
import Product from '../Interface/product';
import { AuthService } from '../Model/auth.service';


import { DatePipe } from '@angular/common';
import 'datatables.net';
declare var $: any;
 
 import buyProducts from '../Interface/buyProduct';


@Component({
  selector: 'app-buy-reports',
  templateUrl: './buy-reports.component.html',
  styleUrls: ['./buy-reports.component.css']
})
export class BuyReportsComponent implements OnInit {
  product!: Product[];
  GetAllBuyProduct!: buyProducts[] |any
  @Input() productitem?: buyProducts;
  NewProduct:Product=new Product()

 dtTrigger: Subject<void> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  selectedItem:buyProducts |any={}
  date!: Date
   source: any;
  language:any= {
                    "sProcessing": "جارٍ التحميل...",
                    "sLengthMenu": "أظهر _MENU_ مدخلات",
                    "sZeroRecords": "لم يعثر على أية سجلات",
                    "sInfo": "إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل",
                    "sInfoEmpty": "يعرض 0 إلى 0 من أصل 0 سجل",
                    "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                    "sInfoPostFix": "",
                    "sSearch": "ابحث:",
                    "sUrl": "",
                    "oPaginate": {
                        "sFirst": "الأول",
                        "sPrevious": "السابق",
                        "sNext": "التالي",
                        "sLast": "الأخير"
                    }
                }
    
 
  
 
  constructor(private ProductSer: ProductService ,private auth:AuthService) { 
    
  }

  ngOnInit(): void {
     this.getAllProduct()
    this.selectedItem = { ...this.productitem }
    this.dtOptions = {
      pagingType: 'full_numbers',
      language:this.language,
   
      retrieve:true,
          dom: 'Bfrtip',
      
       
      
    }
   
  }
 getProduct(): void {
    this.ProductSer.getAllProduct().snapshotChanges().pipe(
      map(cahange =>
        cahange.map(c => ({ id: c.payload.doc.id, ...c.payload.doc.data() }))
      )
    ).subscribe(data => {
      this.product = data;
    
     
    })
  }
   getAllProduct(){
          return new Promise<any>((resolve) => {

    this.ProductSer.getBuyProductByMail(this.auth.userData.email).subscribe(product => {
          resolve(product)

          console.log(product)
          this.GetAllBuyProduct =product
            this.dtTrigger.next()
        }
        )
   
  
    
      })
    
   
       
   }
    deleteproduct(item:any){
      
      Swal.fire({
        title: 'هل تريد حذف المنتج',
      
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'حذف',
        cancelButtonText: 'الغاء'
      }).then((result) => {
        if (result.value) {
          this.selectedItem=item;
        console.log(this.selectedItem.id)
      
          this.ProductSer.deleteBuyProduct(this.selectedItem.id).catch(error => console.log(error))
          
        this.selectedItem.BuyProduct?.forEach(
        async (el:any) => {
          this.ProductSer.getProductname(el.productname).subscribe((data:any) => {
            data.forEach((element:any) => {
              this.NewProduct = element.data()
              console.log(this.NewProduct)
                
              
                const data = {
                  
                  mount: Number(this.NewProduct.mount) - Number(el.mount),
                  BuyMount: Number(this.NewProduct.BuyMount) - Number(el.mount),
               


              

                  


                }
                console.log(element.id)
                this.ProductSer.update(element.id, data).then(() => {
                  console.log('updatesuccessful')
            
          
                }).catch(err => console.log(err));
           
        
              
              
            }
       
            )
          })
        }
    )
               
    
          Swal.fire(
             'تم حذف المنتج بنجاح'
          )

        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'لم يتم الحذف'
          )
        }
      })
    }
   ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
  }   
   onSelect(item:any) {
    this.selectedItem=item
    console.log("Selected item Id: ", item); // You get the Id of the selected item here
}
}
