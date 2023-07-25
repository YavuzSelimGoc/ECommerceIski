import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-private-layout',
  templateUrl: './private-layout.component.html',
  styleUrls: ['./private-layout.component.scss']
})
export class PrivateLayoutComponent  {
  
  isTrue:boolean
  constructor(private router:Router,private toastrService:ToastrService){this.chechAuth()}

chechAuth(){
 if( localStorage.getItem('username')===null && localStorage.getItem('userType')!=='admin'){
  this.router.navigate(["/login/admin"])
  this.toastrService.info('Lütfen Giriş Yapınız Yetkiniz Yok','Yetkiniz Yok')
 }
 else{
  this.router.navigate(["/admin"])
 }
}

}
