import { BasketService } from './../../services/basket.service';
import { ProductService } from './../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ProductDto } from '../../models/productDto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Basket } from '../../models/basket';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  productDto:ProductDto[]=[]
  basket:Basket[]=[]
  basketForm:FormGroup
  userName:string
  isTrue:boolean
  constructor(private httpClient:HttpClient,private formBuilder:FormBuilder,private productService:ProductService,private basketService:BasketService,private router:Router){  this.createBasketAddForm() }
  ngOnInit(): void {
    this.userName=localStorage.getItem('username')
  this.getProduct()
  this.createBasketAddForm()
  }
  getProduct() {
    this.productService.getProductDto().subscribe(repsonse => {
      this.productDto = repsonse.data  
    })
  }
  createBasketAddForm(){
    this.basketForm=this.formBuilder.group({
      productId:["",Validators.required],
      userName:["",Validators.required],
    })
  }
  add(product:ProductDto){
   
    this.basketService.getBasketByUserName(this.userName).subscribe(repsonse => {
      this.basket = repsonse.data      
      this.basket.forEach(blog => {
    
        if (blog.productId===product.productId)
        {  
          this.isTrue=true
        }
        else{this.isTrue=false}
          
      });  
    })

    if(this.isTrue===false){
      this.basketForm.controls['productId'].setValue(product.productId)
      this.basketForm.controls['userName'].setValue(localStorage.getItem('username'))
      
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
      console.log("Aynı Ürün Sepette") 
      
     }
  
  
  
  }
  
  
  createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }
  

}