import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Model/product.service';
import Experter from '../Interface/Experter';
import { Router ,ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../Model/auth.service';
@Component({
  selector: 'app-exporter-operation',
  templateUrl: './exporter-operation.component.html',
  styleUrls: ['./exporter-operation.component.css']
})
export class ExporterOperationComponent implements OnInit {

  
  Expert!:Experter[]|any
  selectditem?: Experter
  id: any
  constructor(private productSer: ProductService, private _router: Router, private _activatedRoute: ActivatedRoute ,private auth:AuthService) { 
    this.getallExperter()
  }

  ngOnInit(): void {
  }
   getallExperter() {
     return new Promise<any>((resolve) => {

    this.productSer.getExperterByMail(this.auth.userData.email).subscribe(product => {
          resolve(product)

          console.log(product)
          this.Expert =product
          
        }
        )
   
  
    
      })
  }

  onselect(item: any, e: any) {
  
   e.preventDefault()
  
        this._router.navigate(['ExpertDetail',item.id]);
     }
   
     


}
