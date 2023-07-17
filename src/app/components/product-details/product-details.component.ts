import { HttpClient } from '@angular/common/http';
import { ProductDto } from './../../models/productDto';
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
  constructor(private httpClient:HttpClient,private activatedroute:ActivatedRoute,private productService:ProductService){ }
  productDto:ProductDto[]
  id:number
  ngOnInit(): void {
    this.activatedroute.params.subscribe(params=>{
      if(params["id"]){
        this.id=params["id"]
        this.getProductById(this.id)
        }
      else{
       
      this.id=params["id"]
   this.getProductById(this.id)
      }
      })
  
  }
   
  
  getProductById(id:number) {
    this.productService.getProductActiveDtoById(id).subscribe(repsonse => {
      this.productDto = repsonse.data  
      console.log(this.productDto)
    })
  }

  createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }
  

}
