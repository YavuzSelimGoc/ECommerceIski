import { environment } from 'src/environments/environment';
import { ResponseModel_Data } from './../models/responseModel_Data';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Favorite } from '../models/favorite';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(favorite:Favorite){
    let newPath=this.apiUrls+"favorite/add";
    return this.httpClient.post(newPath,favorite)
   }
   getFavorite():Observable<ListResponseModel<Favorite>>{
    let newPath=this.apiUrls+"favorite/getall";
    return this.httpClient.get<ListResponseModel<Favorite>>(newPath)
  }
  getFavoriteByUserName(userName:string):Observable<ListResponseModel<Favorite>>{
    let newPath=this.apiUrls + "favorite/getall/?userName="+userName
    return this.httpClient.get<ListResponseModel<Favorite>>(newPath)
  }
  getFavoriteActive():Observable<ListResponseModel<Favorite>>{
    let newPath=this.apiUrls+"favorite/getallActive";
    return this.httpClient.get<ListResponseModel<Favorite>>(newPath)
  }
  getFavoriteById(favoriteID):Observable <ResponseModel_Data<Favorite>> {
    let newPath=this.apiUrls + "favorite/GetById/?id="+favoriteID
    return this.httpClient
       .get<ResponseModel_Data<Favorite>>(newPath);
   }
   getFavoriteByProductId(productID):Observable <ResponseModel_Data<Favorite>> {
    let newPath=this.apiUrls + "favorite/GetByProductId/?id="+productID
    return this.httpClient
       .get<ResponseModel_Data<Favorite>>(newPath);
   }
  delete(favorite:Favorite){
    let newPath=this.apiUrls + "favorite/delete"
    return this.httpClient.post(newPath,favorite)
   }
   passive(favorite:Favorite){
    let newPath=this.apiUrls + "favorite/passive"
    return this.httpClient.post(newPath,favorite)
   }
   update(favorite:Favorite){
    let newPath=this.apiUrls+"favorite/update";
    return this.httpClient.post(newPath,favorite)
   }
   active(favorite:Favorite){
    let newPath=this.apiUrls + "favorite/active"
    return this.httpClient.post(newPath,favorite)
   }
}
