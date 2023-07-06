import { ResponseModel_Data } from './../models/responseModel_Data';
import { ListResponseModel } from './../models/listResponseModel';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUrls=environment.apiUrl;
  constructor(private httpClient:HttpClient) { }

  add(category:Category){
    let newPath=this.apiUrls+"category/add";
    return this.httpClient.post(newPath,category)
   }
   getCategory():Observable<ListResponseModel<Category>>{
    let newPath=this.apiUrls+"category/getall";
    return this.httpClient.get<ListResponseModel<Category>>(newPath)
  }
  getCategoryActive():Observable<ListResponseModel<Category>>{
    let newPath=this.apiUrls+"category/getallActive";
    return this.httpClient.get<ListResponseModel<Category>>(newPath)
  }
  getCategoryById(categoryID):Observable <ResponseModel_Data<Category>> {
    let newPath=this.apiUrls + "category/GetById/?id="+categoryID
    return this.httpClient
       .get<ResponseModel_Data<Category>>(newPath);
   }
  delete(category:Category){
    let newPath=this.apiUrls + "category/delete"
    return this.httpClient.post(newPath,category)
   }
   passive(category:Category){
    let newPath=this.apiUrls + "category/passive"
    return this.httpClient.post(newPath,category)
   }
   update(category:Category){
    let newPath=this.apiUrls+"category/update";
    return this.httpClient.post(newPath,category)
   }
   active(category:Category){
    let newPath=this.apiUrls + "category/active"
    return this.httpClient.post(newPath,category)
   }
}
