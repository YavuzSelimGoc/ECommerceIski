import { FormGroup } from '@angular/forms';
import { Product } from './../../models/product';
import { ProductService } from './../../services/product.service';
import { BasketService } from './../../services/basket.service';
import { HttpClient } from '@angular/common/http';
import { Basket } from './../../models/basket';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductDto } from '../../models/productDto';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
   quantity:number[]=[]
   Total:number
   deleteProduct:Basket
  basket:Basket[]=[]
  deneme:string
  products:Product[]=[]
  product:Product

  basketForm:FormGroup
  constructor(private httpClient:HttpClient,private basketService:BasketService,private productService:ProductService){ }
  ngOnInit(): void {
  this.deneme=localStorage.getItem("username")
  this.getCategory()
  this.quantity
  }
  getCategory() {
    this.basketService.getBasketByUserName(this.deneme).subscribe(repsonse => {
      this.basket = repsonse.data  
   this.quantity
      this.getProduct()
    })
  }
  getProduct() {
    this.basket.forEach(bask => {
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
   
    //this.quantity.push(this.basketForm.get('quant'+bask.productId).value);
   
    } );
 //  console.log(this.quantity)
  }
  delete(product:Product){
    this.basketService.getBasketByProductId(product.productId).subscribe(response=>{
      this.deleteProduct=response.data
      this.basketService.delete(this.deleteProduct).subscribe(response=>{
      });
     });
     
    
   }

  createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }
}