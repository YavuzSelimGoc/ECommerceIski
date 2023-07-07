import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm:FormGroup
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      userName: ["",Validators.required],
      password:["",Validators.required]
    })
  }
  
    login(){
      if(this.loginForm.valid){
      
        let loginModel = Object.assign({},this.loginForm.value)
        this.authService.login(loginModel).subscribe(response=>{
          localStorage.setItem("token",response.token)
          localStorage.setItem("username",response.userName)
          this.router.navigate(["/admin"])
        },responseError=>{
          console.log(responseError)
          // this.toastrService.error("Giriş Bilgileri Yanlış")
          console.log("oha")
        })
      }
      // else{this.toastrService.error("Giriş Bilgileri Yanlış")}
      console.log("oha")
    }
  
}