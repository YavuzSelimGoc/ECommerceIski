import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BasketService } from './../../services/basket.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { FavoriteService } from './../../services/favorite.service';
import { HttpClient } from '@angular/common/http';
import { Favorite } from './../../models/favorite';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductDto } from '../../models/productDto';
import { Basket } from 'src/app/models/basket';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
   quantity:number[]=[]
   Total:number
   basket:Basket[]=[]
   favoritesForm:FormGroup
   deleteProduct:Favorite
  favorite:Favorite[]=[]
  userName:string
  products:Product[]=[]
  product:Product
isTrue:boolean
  favoriteForm:FormGroup
  constructor(private httpClient:HttpClient,private router:Router,private formBuilder:FormBuilder,private toastrService:ToastrService,private favoriteService:FavoriteService,private basketService:BasketService,private productService:ProductService){ this.createBasketAddForm()}
  ngOnInit(): void {
  this.userName=localStorage.getItem("username")
  this.getCategory()
  this.checkAuth()
  this.quantity
  }
  getCategory() {
    this.favoriteService.getFavoriteByUserName(this.userName).subscribe(repsonse => {
      this.favorite = repsonse.data  
   this.quantity
      this.getProduct()
    })
  }
  getProduct() {
    this.favorite.forEach(bask => {
      this.productService.getProductById(bask.productId).subscribe(repsonse => {
       this.product=repsonse.data
       this.products.push(this.product)
      })
      this.getProducts()
    } );
   
  }
  getProducts() {
    this.products.forEach(bask => {
    this.Total=this.Total+bask.productPrice
   
    } );
  }
  createBasketAddForm(){
    this.favoriteForm=this.formBuilder.group({
      productId:["",Validators.required],
      userName:["",Validators.required],
    })
  }
  add(product:Product){  

    this.isTrue=false
              this.basketService.getBasketByUserName(this.userName).subscribe(repsonse => {
                this.basket = repsonse.data      
                 const existingProduct = this.basket.find(item => item.productId === product.productId);
                if(!existingProduct){
                
                  this.favoriteForm.controls['productId'].setValue(product.productId)
                  this.favoriteForm.controls['userName'].setValue(localStorage.getItem('username'))
                  console.log('nurla')
                  if(this.favoriteForm.valid){
                    let categoryModel =Object.assign({},this.favoriteForm.value) 
                    this.basketService.add(categoryModel).subscribe(response=>{
                      this.router.navigate(["/sepet"])
                    });
                  }
                  else {
                    console.log("Kategori Eklenemedi");
                  } 
                 }
                 else{
                  this.toastrService.error("Aynı Ürün Sepette Var","HATA")
                 }
              })
       
             
            
  
    }
  checkAuth(){
if(localStorage.getItem('username')===null)
{
  this.isTrue=true
}
else{
  this.isTrue=false
}
  }
  delete(product:Product){
    this.favoriteService.getFavoriteByProductId(product.productId).subscribe(response=>{
      this.deleteProduct=response.data
      this.favoriteService.delete(this.deleteProduct).subscribe(response=>{
      });
     });
   }

  createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }
}