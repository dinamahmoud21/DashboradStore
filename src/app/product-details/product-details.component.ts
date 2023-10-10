import { Component, OnInit  ,Input,Output, EventEmitter, OnDestroy} from '@angular/core';
import { ProductService } from '../Model/product.service';
import product from '../Interface/product'
import { map } from 'rxjs';
import Swal from 'sweetalert2';
import {Subject} from 'rxjs';
import 'datatables.net';
declare var $: any;
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import DataTable from 'datatables.net-dt';
import { FormBuilder, FormGroup, FormArray, FormControl ,Validators, AbstractControl } from '@angular/forms'
import { AuthService } from '../Model/auth.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit ,OnDestroy {
   Products?: [] |any;
   @Input()productitem?:product;
   @Output() closeModalEvent = new EventEmitter<boolean>();
   dtTrigger: Subject<void> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  updateform !:FormGroup
   message?:string
   selectedItem:product |any={}
   submitted=false;
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
    
 slideConfig = {  
    "slidesToShow": 1,  
    "slidesToScroll": 1,  
    "dots": true,  
   "infinite": false,
     rtl: true,

     arrows: false,
   
  };  
  
 
constructor(private Product:ProductService ,private FB:FormBuilder ,private auth :AuthService) { 
  
  }

  ngOnInit(): void {
    this.getAllProduct()
    this.selectedItem = { ...this.productitem }
    this.dtOptions = {
      pagingType: 'full_numbers',
      language:this.language,
      responsive: true,
        retrieve:true,

           dom: 'Bfrtip',
      
      
       
      
    }
     this.updateform = this.FB.group({
      productname:new FormControl(this.selectedItem.productname),
      productcode: new FormControl( this.selectedItem.productcode ),
      saleprice: new FormControl( this.selectedItem.saleprice ),
      buyprice:new FormControl( this.selectedItem.buyprice ),
      notice:new FormControl(this.selectedItem.notice),
      productcat:new FormControl(this.selectedItem.productcat) ,
     
      mount:new FormControl(this.selectedItem.mount)
     
      
      
    })
    
    };
    
       
  
  getAllProduct() {
    
      console.log(this.auth.userData.email)
      return new Promise<any>((resolve) => {
        this.Product.getProductByMail(this.auth.userData.email).subscribe(product => {

          resolve(product)

          console.log(product)
          this.Products =product
            this.dtTrigger.next()
        }
        )
   
  
    
      })
    
   
  }
 
  onSelect(item:any) {
    this.selectedItem=item
    console.log("Selected item Id: ", item); 
    this.updateform = this.FB.group({
      productname:new FormControl(this.selectedItem.productname),
      productcode: new FormControl( this.selectedItem.productcode ),
      saleprice: new FormControl( this.selectedItem.saleprice ),
      buyprice:new FormControl( this.selectedItem.buyprice ),
      notice:new FormControl(this.selectedItem.notice),
      productcat: new FormControl(this.selectedItem.productcat),
      mount:new FormControl(this.selectedItem.mount)

      
      
    })
  }
  onselectproduct(item:any){
    this.selectedItem=item
  }
updateproduct() {
    const data = this.updateform.value

   
      this.Product.update(this.selectedItem.id, data)
        .then(() => this.message = 'The tutorial was updated successfully!')
        .catch(err => console.log(err));
        this.submitted=true
        this.closeModalEvent.emit(false);  
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
      
        this.Product.delete(this.selectedItem.id).catch(error => console.log(error))
        
               
    
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
  }

       
          
          
      
    
    
    
  

