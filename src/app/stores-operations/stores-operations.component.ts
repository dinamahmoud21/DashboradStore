import { Component, OnInit } from '@angular/core';
import Stores from '../Interface/Stores';
import { ProductService } from '../Model/product.service';
import { map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common';
import { AuthService } from '../Model/auth.service';
@Component({
  selector: 'app-stores-operations',
  templateUrl: './stores-operations.component.html',
  styleUrls: ['./stores-operations.component.css']
})
export class StoresOperationsComponent implements OnInit {
   Stores!:Stores[] |any
  selectditem?: Stores
  id: any
  constructor(private productSer: ProductService, private _router: Router, private _activatedRoute: ActivatedRoute ,private _location: Location ,private auth:AuthService) { 
    this.getallStores()
  }

  ngOnInit(): void {
  }
   getallStores() {
     return new Promise<any>((resolve) => {

    this.productSer.getStoreByMail(this.auth.userData.email).subscribe(product => {
          resolve(product)

          console.log(product)
          this.Stores =product
          
        }
        )
   
  
    
      })
   }
   backClicked() {
    this._location.back();
  }
  onselect(item: any, e: any) {
  
   e.preventDefault()
  
        this._router.navigate(['StoresDetail',item.id]);
     }
   
     

 }

