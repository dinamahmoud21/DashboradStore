import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddProductComponent } from './add-product/add-product.component';
import {AngularFireModule} from '@angular/fire' 
import {FormsModule} from '@angular/forms'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { firebase } from 'src/environments/firebase';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { NgSelectModule } from '@ng-select/ng-select';

import { DataTablesModule } from "angular-datatables";
import { ReactiveFormsModule } from '@angular/forms';
import { BuyProductsComponent } from './buy-products/buy-products.component';
import { AddStoresComponent } from './add-stores/add-stores.component';
import { AddExperterComponent } from './add-experter/add-experter.component';
import { BuyReportsComponent } from './buy-reports/buy-reports.component';
import { UpdateBuyProductComponent } from './update-buy-product/update-buy-product.component';
import { StoresOperationsComponent } from './stores-operations/stores-operations.component';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule } from 'ngx-toastr';
import { ExporterOperationComponent } from './exporter-operation/exporter-operation.component';
import { ExportDetailsComponent } from './export-details/export-details.component';
import { SaleBillComponent } from './sale-bill/sale-bill.component';
import { LoginComponent } from './login/login.component';
import { SaleReportComponent } from './sale-report/sale-report.component';
import { UpdateSaleBillComponent } from './update-sale-bill/update-sale-bill.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { VerifyEnailAddressComponent } from './verify-enail-address/verify-enail-address.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SubHomeComponent } from './sub-home/sub-home.component';  
import {NgxPrintModule} from 'ngx-print';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';




@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  
    AddProductComponent,
    ProductDetailsComponent,
    BuyProductsComponent,
    AddStoresComponent,
    AddExperterComponent,
    BuyReportsComponent,
    UpdateBuyProductComponent,
    StoresOperationsComponent,
    StoreDetailsComponent,
    ExporterOperationComponent,
    ExportDetailsComponent,
    SaleBillComponent,
    LoginComponent,
    SaleReportComponent,
    UpdateSaleBillComponent,
    RegisterComponent,
    HomeComponent,
    VerifyEnailAddressComponent,
 
    NavBarComponent,
    UserProfileComponent,
    SubHomeComponent,
    ForgetpasswordComponent,
    
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
     NgxPrintModule,
    BrowserAnimationsModule,
     ToastrModule.forRoot({
      closeButton: true,
      timeOut: 1000, // 15 seconds
      progressBar: true,
     
    }),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase ),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgSelectModule,
   DataTablesModule ,
   ReactiveFormsModule,
   NgxDropzoneModule,
   SlickCarouselModule
   
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

