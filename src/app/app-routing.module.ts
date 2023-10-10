import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import {ProductDetailsComponent} from './product-details/product-details.component'
import { BuyProductsComponent } from './buy-products/buy-products.component';
import { AddStoresComponent } from './add-stores/add-stores.component';
import { AddExperterComponent } from './add-experter/add-experter.component';
import { BuyReportsComponent } from './buy-reports/buy-reports.component';
import { UpdateBuyProductComponent } from './update-buy-product/update-buy-product.component';
import { StoresOperationsComponent } from './stores-operations/stores-operations.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { ExporterOperationComponent } from './exporter-operation/exporter-operation.component';
import { ExportDetailsComponent } from './export-details/export-details.component';
import { SaleBillComponent } from './sale-bill/sale-bill.component';
import { SaleReportComponent } from './sale-report/sale-report.component';
import { UpdateSaleBillComponent } from './update-sale-bill/update-sale-bill.component';
import { LoginComponent } from './login/login.component'
import {RegisterComponent} from './register/register.component'
import { HomeComponent } from './home/home.component';
import { VerifyEnailAddressComponent } from './verify-enail-address/verify-enail-address.component'
import {GaurdService} from './Model/gaurd.service'
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SubHomeComponent } from './sub-home/sub-home.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'register' ,component:RegisterComponent},
  {path:'login' ,component:LoginComponent},
   {
      path :'VerifyEmail' ,component:VerifyEnailAddressComponent
    },
     {
      path :'forgetpassword' ,component:ForgetpasswordComponent
    },

  {
    path: "home", component: HomeComponent,canActivate:[GaurdService] , children: [
      
      
    {path:'SubHome',component:SubHomeComponent },  
  {path:'addProduct',component:AddProductComponent},
  {path:'ProductDetails',component:ProductDetailsComponent},
   {path:'BuyProduct',component: BuyProductsComponent},
  {path:'AddStore',component: AddStoresComponent},
  {path:'AddExperter',component: AddExperterComponent},
  {path:'BuyReport',component: BuyReportsComponent},
  { path: 'updateBuyProduct/:id', component: UpdateBuyProductComponent },
    { path: 'UpdateSaleBill/:id', component: UpdateSaleBillComponent },
     {
    path: 'Stores', component: StoresOperationsComponent
  } ,
    {path: 'StoresDetail/:id' ,component: StoreDetailsComponent},
    {path: 'Experter', component: ExporterOperationComponent},
     {path: 'ExportDetail/:id' ,component: ExportDetailsComponent},
  {
    path: 'SaleBill', component: SaleBillComponent
  },
   {
    path: 'SaleReport', component: SaleReportComponent
  },
{
    path: 'userProfile', component: UserProfileComponent
  }
  
]},
 
   
 
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
