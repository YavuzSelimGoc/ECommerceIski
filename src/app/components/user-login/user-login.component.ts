import { AuthService } from 'src/app/services/auth.service';
import { Component, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
 
  loginForm:FormGroup
  registerForm:FormGroup
  constructor(private formBuilder:FormBuilder,private elementRef: ElementRef,private authService:AuthService,private router:Router ,private toastrService:ToastrService) { }
  ngOnInit() {
    const signUpButton = this.elementRef.nativeElement.querySelector('#signUp');
    const signInButton = this.elementRef.nativeElement.querySelector('#signIn');
    const container = this.elementRef.nativeElement.querySelector('#container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
    this.createLoginForm()
    this.createRegisterForm()
}
createLoginForm(){
  this.loginForm = this.formBuilder.group({
    userName: ["",Validators.required],
    password:["",Validators.required]
  })
}
createRegisterForm(){
  this.registerForm = this.formBuilder.group({
    userName: ["",Validators.required],
    password:["",Validators.required],
    lastName:["",Validators.required],
    firstName:["",Validators.required],
    userType:["",Validators.required],
  })
}
login(){
  if(this.loginForm.valid){
      
    let loginModel = Object.assign({},this.loginForm.value)
    this.authService.login(loginModel).subscribe(response=>{
      this.toastrService.success("Giriş İşlemi Başarılı")
      localStorage.setItem("token",response.token)
      localStorage.setItem("username",response.userName)
      localStorage.setItem("userType",response.userType)
      this.router.navigate(["/"])
    },responseError=>{
      console.log(responseError)
      // this.toastrService.error("Giriş Bilgileri Yanlış")
      this.toastrService.error("Giriş Bilgileri Yanlış")
    })
  }
}
register(){
  this.registerForm.controls['userType'].setValue('customer');
  console.log(this.registerForm.value)
    if(this.registerForm.valid){
      let productModel =Object.assign({},this.registerForm.value) 
      this.authService.register(productModel).subscribe(response=>{
        window.location.reload() 
      });
    }
    else {
      console.log("Kullanıcı Eklenemedi");
    } 
}
}