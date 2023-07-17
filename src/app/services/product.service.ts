import { ProductDto } from './../models/productDto';
import { ResponseModel_Data } from './../models/responseModel_Data';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(product:Product){
    let newPath=this.apiUrls+"product/add";
    return this.httpClient.post(newPath,product)
   }
   getProduct():Observable<ListResponseModel<ProductDto>>{
    let newPath=this.apiUrls+"product/getall";
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath)
  }
  getProductActive():Observable<ListResponseModel<ProductDto>>{
    let newPath=this.apiUrls+"product/getallActive";
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath)
  }
  getProductDto():Observable<ListResponseModel<ProductDto>>{
    let newPath=this.apiUrls+"product/getallDto";
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath)
  }
  getProductActiveDto():Observable<ListResponseModel<ProductDto>>{
    let newPath=this.apiUrls+"product/getallActive";
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath)
  }
  getProductActiveDtoByCategory( categoryId:number):Observable<ListResponseModel<ProductDto>>{
    let newPath=this.apiUrls+"product/getallDtoByCategory?categoryId="+categoryId;
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath)
  }
  getProductActiveDtoById( id:number):Observable<ListResponseModel<ProductDto>>{
    let newPath=this.apiUrls+"product/getallDtoById?id="+id;
    return this.httpClient.get<ListResponseModel<ProductDto>>(newPath)
  }
  getProductById(productID):Observable <ResponseModel_Data<Product>> {
    let newPath=this.apiUrls + "product/GetById/?id="+productID
    return this.httpClient
       .get<ResponseModel_Data<Product>>(newPath);
   }
  delete(product:ProductDto){
    let newPath=this.apiUrls + "product/delete"
    return this.httpClient.post(newPath,product)
   }
   passive(product:ProductDto){
    let newPath=this.apiUrls + "product/passive"
    return this.httpClient.post(newPath,product)
   }
   update(product:Product){
    let newPath=this.apiUrls+"product/update";
    return this.httpClient.post(newPath,product)
   }
   active(product:ProductDto){
    let newPath=this.apiUrls + "product/active"
    return this.httpClient.post(newPath,product)
   }
}
