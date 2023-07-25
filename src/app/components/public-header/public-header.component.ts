import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-public-header',
  templateUrl: './public-header.component.html',
  styleUrls: ['./public-header.component.scss']
})
export class PublicHeaderComponent implements OnInit{
  category:Category[]
  isTrue:boolean
  constructor(private httpClient:HttpClient,private categoryService:CategoryService,private toastrService:ToastrService){ }
  ngOnInit(): void {
  this.getCategory()
this.chechkAuth()
  }
  getCategory() {
    this.categoryService.getCategory().subscribe(repsonse => {
      this.category = repsonse.data  
    })
  }
  chechkAuth(){
    if(localStorage.getItem('username')===null)
    {
      this.isTrue=false
    }
    else{
      this.isTrue=true
    }
  }
  logOut(){
    if(localStorage.getItem('username')===null){
      this.toastrService.info("Lütfen Önce Giriş Yapınız","Oturum Açınız")
      this.chechkAuth()
    }
    else{
    localStorage.clear()
    this.toastrService.info("Çıkış İşlemi Başarılı","Çıkış Yapıldı")
    window.location.reload()
    this.chechkAuth()
    }
  }

}
