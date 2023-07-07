import { ResponseModel_Data } from './../models/responseModel_Data';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Basket } from '../models/basket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(basket:Basket){
    let newPath=this.apiUrls+"basket/add";
    return this.httpClient.post(newPath,basket)
   }
   getBasket():Observable<ListResponseModel<Basket>>{
    let newPath=this.apiUrls+"basket/getall";
    return this.httpClient.get<ListResponseModel<Basket>>(newPath)
  }
  getBasketByUserName(userName:string):Observable<ListResponseModel<Basket>>{
    let newPath=this.apiUrls + "basket/getall/?userName="+userName
    return this.httpClient.get<ListResponseModel<Basket>>(newPath)
  }
  getBasketActive():Observable<ListResponseModel<Basket>>{
    let newPath=this.apiUrls+"basket/getallActive";
    return this.httpClient.get<ListResponseModel<Basket>>(newPath)
  }
  getBasketById(basketID):Observable <ResponseModel_Data<Basket>> {
    let newPath=this.apiUrls + "basket/GetById/?id="+basketID
    return this.httpClient
       .get<ResponseModel_Data<Basket>>(newPath);
   }
   getBasketByProductId(productID):Observable <ResponseModel_Data<Basket>> {
    let newPath=this.apiUrls + "basket/GetByProductId/?id="+productID
    return this.httpClient
       .get<ResponseModel_Data<Basket>>(newPath);
   }
  delete(basket:Basket){
    let newPath=this.apiUrls + "basket/delete"
    return this.httpClient.post(newPath,basket)
   }
   passive(basket:Basket){
    let newPath=this.apiUrls + "basket/passive"
    return this.httpClient.post(newPath,basket)
   }
   update(basket:Basket){
    let newPath=this.apiUrls+"basket/update";
    return this.httpClient.post(newPath,basket)
   }
   active(basket:Basket){
    let newPath=this.apiUrls + "basket/active"
    return this.httpClient.post(newPath,basket)
   }
}
