import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductDto } from 'src/app/models/productDto';
import { ProductService } from 'src/app/services/product.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  products:Product
  productDto:ProductDto[]=[]
  
  constructor(private httpClient:HttpClient,private productService:ProductService){ }
  ngOnInit(): void {
  this.getProduct()
  }
  getProduct() {
    this.productService.getProductDto().subscribe(repsonse => {
      this.productDto = repsonse.data  
    })
  }
  getProductyById(productID:number){
    this.productService.getProductById(productID).subscribe((response) => {
      this.products=response.data;
    
    });
  }
   delete(productDto:ProductDto){
   this.productService.delete(productDto).subscribe(response=>{
    
    });
  }
  passive(productDto:ProductDto){
  
    this.productService.passive(productDto).subscribe(response=>{
    
    });
  }
  active(productDto:ProductDto){
    
   this.productService.active(productDto).subscribe(response=>{
   });
  
  }
  createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }
  

}