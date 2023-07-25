import { FavoriteService } from './../../services/favorite.service';
import { ToastrService } from 'ngx-toastr';
import { BasketService } from './../../services/basket.service';
import { ProductService } from './../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductDto } from '../../models/productDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Basket } from '../../models/basket';
import { Favorite } from 'src/app/models/favorite';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  productDto:ProductDto[]=[]
  basket:Basket[]=[]
  favorite:Favorite[]=[]
  basketForm:FormGroup
  updateBasketForm:FormGroup
  favoriteForm:FormGroup
  userName:string
  isTrue:boolean
  tryId:number
  filtertext="";
  categoryId:number
  constructor(private httpClient:HttpClient,private favoriteService:FavoriteService,private toastrService:ToastrService,private activatedroute:ActivatedRoute,private formBuilder:FormBuilder,private productService:ProductService,private basketService:BasketService,private router:Router){  this.createBasketAddForm(),this.createFavoriteAddForm() }
  ngOnInit(): void {
    this.activatedroute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.categoryId=params["categoryId"]
        this.getProductByCategory(params["categoryId"])
        this.createBasketAddForm()
        this.createBasketUpdateForm()
        this.createFavoriteAddForm()
        this.userName=localStorage.getItem('username')
        }
      else{
       
      this.categoryId=params["categoryId"]
      this.userName=localStorage.getItem('username')
      this.getProduct()
      this.createBasketAddForm()
      this.createBasketUpdateForm()
      }
      })
  
  }

  getProduct() {
    this.productService.getProductDto().subscribe(repsonse => {
      this.productDto = repsonse.data  
    })
  }
  getProductByCategory(categoryId:number) {
    this.productService.getProductActiveDtoByCategory(categoryId).subscribe(repsonse => {
      this.productDto = repsonse.data  
    })
  }
  createBasketAddForm(){
    this.basketForm=this.formBuilder.group({
      productId:["",Validators.required],
      userName:["",Validators.required],
      quantity:["",Validators.required]
    })
  }
  createBasketUpdateForm(){
    this.updateBasketForm=this.formBuilder.group({
      productId:["",Validators.required],
      basketId:["",Validators.required],
      userName:["",Validators.required],
      quantity:["",Validators.required]
    })
  }
  createFavoriteAddForm(){
    this.favoriteForm=this.formBuilder.group({
      productId:["",Validators.required],
      userName:["",Validators.required],
    })
  }
  add(product:ProductDto){  
            this.basketService.getBasketByUserName(this.userName).subscribe(repsonse => {
              this.basket = repsonse.data      
              console.log(this.basket)
               const existingProduct = this.basket.find(item => item.productId === product.productId);
         
              if(!existingProduct){
            
                this.basketForm.controls['productId'].setValue(product.productId)
                this.basketForm.controls['userName'].setValue(localStorage.getItem('username'))
                this.basketForm.controls['quantity'].setValue(1);
                if(this.basketForm.valid){
                  let categoryModel =Object.assign({},this.basketForm.value) 
                  this.basketService.add(categoryModel).subscribe(response=>{
                    this.router.navigate(["/sepet"])
                  });
                }
                else {
                  console.log("Kategori Eklenemedi");
                } 
               }
               else{
             
                this.updateBasketForm.controls['productId'].setValue(product.productId)
                this.updateBasketForm.controls['basketId'].setValue(existingProduct.basketId)
                this.updateBasketForm.controls['userName'].setValue(localStorage.getItem('username'))
                this.updateBasketForm.controls['quantity'].setValue(existingProduct.quantity+1);
                if(this.updateBasketForm.valid){
                  let categoryModel =Object.assign({},this.updateBasketForm.value) 
                  this.basketService.update(categoryModel).subscribe(response=>{
                    this.router.navigate(["/sepet"])
                    this.toastrService.success("Sepetteki ürün sayısı "+(existingProduct.quantity+1)+" olarak güncellendi ","Sepete Eklendi")
                  });
                }
                else {
                  console.log("Kategori Eklenemedi");
                } 
               }
            })
       
           
          

  }
  addFavorite(product:ProductDto){  

    this.isTrue=false
              this.favoriteService.getFavoriteByUserName(this.userName).subscribe(repsonse => {
                this.favorite = repsonse.data      
                 const existingProduct = this.favorite.find(item => item.productId === product.productId);
                if(!existingProduct){
                  this.favoriteForm.controls['productId'].setValue(product.productId)
                  this.favoriteForm.controls['userName'].setValue(localStorage.getItem('username'))
                  if(this.favoriteForm.valid){
                    let categoryModel =Object.assign({},this.favoriteForm.value) 
                    this.favoriteService.add(categoryModel).subscribe(response=>{
                      this.router.navigate(["/favoriler"])
                    });
                  }
                  else {
                    console.log("Kategori Eklenemedi");
                  } 
                 }
                 else{
                  this.toastrService.error("Aynı Ürün Favorilerde Var","HATA")
                 }
              })
          console.log(this.isTrue)
             
            
  
    }
  
  
  createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }
  

}