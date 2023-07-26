import { BasketListDto } from './../../models/basketListDto';
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
   BasketTotal:number[]=[]
   deleteProduct:Basket
  basket:Basket[]=[]
 
  basketListDto:BasketListDto[]=[]
  addedbasketListDto:BasketListDto
  deneme:string
  products:Product[]=[]
  product:Product
  totalize: number = 0;
isTrue:boolean
  basketForm:FormGroup
  constructor(private httpClient:HttpClient,private basketService:BasketService,private productService:ProductService){ }
  ngOnInit(): void {
  this.deneme=localStorage.getItem("username")

  this.getCategory()
  this.checkAuth()
  console.log(this.BasketTotal[0])
  const totalize: number = this.BasketTotal.reduce((total, currentValue) => total + currentValue, 0);
  
  }
  getCategory() {
    this.basketService.getBasketByUserName(this.deneme).subscribe(repsonse => {
      this.basket = repsonse.data  
  
      this.getProduct()
  
    })
  }
  
  getProduct() {
    this.basket.forEach(bask => {
      this.productService.getProductById(bask.productId).subscribe(repsonse => {
        this.product = repsonse.data;
        const addedBasketItem: BasketListDto = new BasketListDto();
        addedBasketItem.basketId = bask.productId;
        addedBasketItem.userName = this.deneme;
        addedBasketItem.quantity = bask.quantity;
        addedBasketItem.img = this.product.productImage;
        addedBasketItem.price = this.product.productPrice;
        addedBasketItem.total = this.product.productPrice * bask.quantity;
        this.BasketTotal.push(addedBasketItem.total);
        this.basketListDto.push(addedBasketItem);
        
        // Elemanlar eklenme işlemi tamamlandığında sumNumericValues() fonksiyonunu çağır
        this.sumNumericValues();
      });
    });
  }
  
sumNumericValues() {
  this.totalize=0
  this.BasketTotal.forEach(element => {
    this.totalize=this.totalize+element
  });
 
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
  delete(productId:number){
    this.basketService.getBasketByProductId(productId).subscribe(response=>{
      this.deleteProduct=response.data
      this.basketService.delete(this.deleteProduct).subscribe(response=>{
      });
     });
   }

  createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }
}