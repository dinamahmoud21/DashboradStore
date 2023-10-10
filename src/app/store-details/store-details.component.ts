import { Component, OnInit ,inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Stores from '../Interface/Stores';
import { ProductService } from '../Model/product.service';
import buyProducts from '../Interface/buyProduct';
import { Subject, Subscription } from 'rxjs';
import Product from '../Interface/product';
import { Location } from '@angular/common';
@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.css']
})
export class StoreDetailsComponent implements OnInit {
  store: Stores | any = new Stores()
   
  getBuyProduct?:any
  product!:Product[]
  tempDoc: any
  id: any
  productitem:any

   dtTrigger: Subject<void> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
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
    
   private route = inject(ActivatedRoute);
  constructor(private productSer: ProductService, 
    private router: Router ,private _location:Location) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      language:this.language,
    
       retrieve:true,
           dom: 'Bfrtip',
      
       
      
  }
    
   
  }

  ngOnInit(): void {
    this.product
     this.dtTrigger.next()

  }
  ngAfterContentInit() {
      this.id=this.route.snapshot.params['id'];
    this.productSer.getStoreById(this.id).subscribe(result => {
      this.store = result
      console.log(this.store)
      this.filterByStoreName(this.store.storeName)
    }
         
       );
   

          
  }
    backClicked() {
    this._location.back();
  }
 async  filterByStoreName(storename:string) {
   this.product = await this.productSer.filterBy(storename)
   this.product.forEach(element => {
     this.dtTrigger.next()
   
     
     
     
   })
    
   console.log(this.product)
   
   return this.product

 }
 
}

