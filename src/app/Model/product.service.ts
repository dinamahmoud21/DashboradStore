import { Injectable } from '@angular/core';
import { AngularFirestore ,AngularFirestoreCollection } from '@angular/fire/firestore';

import Product from '../Interface/product';
import catlist from '../Interface/catlist';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import {productimage } from '../Interface/productimage'
import { finalize, Observable, Subject } from 'rxjs';
import buyProducts from '../Interface/buyProduct';
import Stores from '../Interface/Stores'
import Experter from '../Interface/Experter';
import SaleBill from '../Interface/SaleBill'
import { loginphoto } from '../Interface/loginPhoto';
import User from '../Interface/User'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private dbpath = '/addproduct';
  private db2path = "/catlist"
  private dbproduct = "/BuyProducts"
  private basePath = '/uploads';
   private base2Path = '/loginphoto';


  private addStore = '/addStores'
  private addExpert = '/addExperter'

  private addSaleBill = '/SaleBill'
  private store: AngularFirestoreCollection<Product>
  private Catlist: AngularFirestoreCollection<catlist>
  private Image: AngularFirestoreCollection<productimage>
  private loginPhoto:AngularFirestoreCollection<loginphoto>
  private buyproduct: AngularFirestoreCollection<buyProducts>
  private AddStores: AngularFirestoreCollection<Stores>
  private AddExperter: AngularFirestoreCollection<Experter>
  private SaleBill: AngularFirestoreCollection<SaleBill>
  dtTrigger: Subject<void> = new Subject<any>();

  constructor(private db: AngularFirestore, private dbupload: AngularFireDatabase, private storage: AngularFireStorage) {
    this.store = db.collection(this.dbpath)
    this.Catlist = db.collection(this.db2path)
    this.Image = db.collection(this.basePath)
    this.loginPhoto=db.collection(this.base2Path)
    this.buyproduct = db.collection(this.dbproduct)
    this.AddStores = db.collection(this.addStore)
    this.AddExperter = db.collection(this.addExpert)
    this.SaleBill = db.collection(this.addSaleBill)
   
    
  }
  
 
  
 
  addproduct(product: Product): any {
    
    return this.store.add({ ...product }).then(doc => {
      product.id = doc.id
      this.update(doc.id ,product)
    })

  }

  addStores(store: Stores): any {
    return this.AddStores.add({ ...store }).then(doc => {
      store.id = doc.id
      this.updateStore(doc.id ,store)
    })
  }
  getstoreid(id: string) {
    return this.store.doc(id)
    
  }
  addExperter(experter: Experter) {
    return this.AddExperter.add({ ...experter }).then(doc =>{

      experter.id = doc.id
      this.updateExperter(doc.id, experter
      )
    })
  }
  addBuyProduct(buyProduct: buyProducts): any {
    return this.buyproduct.add({ ...buyProduct }).then(doc => {
     
         buyProduct.id =doc.id
       
     
      this.updateBuyproduct(doc.id ,buyProduct)
    })
  }
  addSale(salebill: SaleBill) {
    return this.SaleBill.add({ ...salebill }).then(doc => {
      salebill.id=doc.id
      this.UpdateSaleProduct(doc.id ,salebill)
      
    })
  }
  addCatlist(catlist: catlist): any {
    return this.Catlist.add({ ...catlist })
  }
  getAllCat(): AngularFirestoreCollection<catlist> {
    return this.Catlist

  }
  getBuyProduct(): AngularFirestoreCollection<buyProducts> {
    return this.buyproduct
  }
  getSaleProduct(): AngularFirestoreCollection<SaleBill> {
    return this.SaleBill
  }
  getAllStore(): AngularFirestoreCollection<Stores> {
    return this.AddStores
  }
  getAllExperter(): AngularFirestoreCollection<Stores> {
    return this.AddExperter
  }
  getAllProduct(): AngularFirestoreCollection<Product> {
    return this.store
  }
  getoneProduct(productname: string) {
    return new Promise<any>((resolve) => {
      this.db.collection(this.dbpath, ref => ref.where('productname', '==', productname)).valueChanges().subscribe(product => {
        resolve(product)

        console.log(product)
      }
      )
    })
  }
  getProductByMail(email: string) {
    
    return   this.db.collection(this.dbpath, ref => ref.where('email', '==', email)).valueChanges()
  
    
  }
  getBuyProductByMail(email: string) {
    
    return   this.db.collection(this.dbproduct, ref => ref.where('useremail', '==', email)).valueChanges()
  
    
  
  }
  getSaleProductByMail(email: string) {
        return   this.db.collection(this.addSaleBill, ref => ref.where('useremail', '==', email)).valueChanges()
  }
  getStoreByMail(email:string){
            return   this.db.collection(this.addStore, ref => ref.where('useremail', '==', email)).valueChanges()


  }
  getExperterByMail(email:string){
            return   this.db.collection(this.addExpert, ref => ref.where('useremail', '==', email)).valueChanges()


  }
   getoneProductbyMount() {
    return new Promise<any>((resolve) => {
      this.db.collection(this.dbpath, ref => ref.where('mount', '>', 0)).valueChanges().subscribe(product => {
        resolve(product)

        console.log(product)
      }
      )
    })
  }
  getStoreById(id: string) {
    return this.AddStores.doc(id).valueChanges()
  }

  getExpertById(id: string) {
    return this.AddExperter.doc(id).valueChanges()
  }
  getBuyProductById(id: string) {
    return this.buyproduct.doc(id).valueChanges()
  }
  getSaleProductById(id: string) {
    return this.SaleBill.doc(id).valueChanges()
  }
  update(id: string, data: any): Promise<void> {
    return this.store.doc(id).update(data);
  }
  updateStore(id: string, data: any): Promise<void> {
    return this.AddStores.doc(id).update(data);
  }
  updateExperter(id: string, data: any): Promise<void> {
    return this.AddExperter.doc(id).update(data);
  }
  updateProduct(id: string, data: any): Promise<void> {
    return this.store.doc(id).update(data);
  }

  updateBuyproduct(id: string, data: any) :Promise<void>{
     return this.buyproduct.doc(id).update(data);
  }

  UpdateSaleProduct(id: string, data: any): Promise<void>{
    return this.SaleBill.doc(id).update(data)
  }
  
  delete(id: string) {
    return this.store.doc(id).delete();
  }
  deleteBuyProduct(id: string) {
    return this.buyproduct.doc(id).delete();
  }
   deleteSaleProduct(id: string) {
    return this.SaleBill.doc(id).delete();
  }
 
  filterBy(storename: string) {
    return new Promise<any>((resolve) => {

      this.db.collection(this.dbpath, ref => ref.where('store', '==', storename)).valueChanges().subscribe(product => {
        resolve(product)

        console.log(product)
      }
      )
    })

   
  }

  filterByExperet(Expertname: string) {
    return new Promise<any>((resolve) => {

      this.db.collection(this.dbpath, ref => ref.where('Expertname', '==', Expertname)).valueChanges().subscribe(product => {
        resolve(product)

        console.log(product)
      }
      )
    })

   
  }
  getProductByCategoty(productcategory: string) {
    return new Promise<any>((resolve) => {
      this.db.collection(this.dbpath, ref => ref.where('productcat', '==', productcategory)).valueChanges().subscribe(product => {
        resolve(product)

        console.log(product)
      }
      )
    })

  }

  getProductname(productname: string) {
    return this.db.collection(this.dbpath, ref => ref.where('productname', '==', productname)).get()
      
   
  }
}
