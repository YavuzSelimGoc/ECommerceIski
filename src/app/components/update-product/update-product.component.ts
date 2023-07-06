import { CategoryService } from './../../services/category.service';
import { Category } from 'src/app/models/category';
import { ProductService } from './../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/models/product';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit{
  productUpdateForm:FormGroup
  sayac=0
  productAddress:string
 
  product:Product;
  category:Category[]
  public resp: {dbPath:''};
  productId:number;

  constructor(private httpClient:HttpClient,private productService:ProductService,
    private formBuilder:FormBuilder,private activatedroute:ActivatedRoute,private router:Router,private categoryService:CategoryService) { this.createProductUpdateForm() }

    ngOnInit(): void {
      this.activatedroute.params.subscribe(params=>{
        if(params["productId"]){
          this.productId=params["productId"]
          this.getProductById(params["productId"])
          this.getCategory()
          }
        else{this.getProductById(params["productId"])}
        this.productId=params["productId"]
        this.getCategory()
        })
    }
  getCategory() {
    this.categoryService.getCategory().subscribe(repsonse => {
      this.category = repsonse.data  
    })
  }
  getProductById(productID:number){
    this.productService.getProductById(productID).subscribe((response) => {
      this.product=response.data;
      this.productAddress=this.product.productImage
      
      this.createProductAddForm();
    });
  }
  createProductUpdateForm(){
    this.productUpdateForm=this.formBuilder.group({
      productId:["",Validators.required],
      categoryId:["",Validators.required],
      productName:[null,Validators.required],
     
      productDescription:["",Validators.required],
      productStock:["",Validators.required],
      productImage:["",Validators.required],
      productPrice:["",Validators.required],
      productStatus:[true,Validators.required],
    })
  }

    update(){
      if(this.sayac===0)
      { this.resp={
        dbPath:null
      }
      this.productUpdateForm.controls['productImage'].setValue(this.productAddress);
      if(this.productUpdateForm.valid){
        let productModel =Object.assign({},this.productUpdateForm.value) 
        this.productService.update(productModel).subscribe(response=>{
          this.router.navigate(["/admin/listProduct"])
          
        });
      }
      else {
        
      } }
      else if(this.sayac!==0){
        this.productUpdateForm.controls['productImage'].setValue(this.resp.dbPath);
      if(this.productUpdateForm.valid){
        let productModel =Object.assign({},this.productUpdateForm.value) 
        this.productService.update(productModel).subscribe(response=>{
          this.router.navigate(["/admin/listProduct"])
        });
      }
      else {} 
      }
     
    }

  
  createProductAddForm(){
    this.productUpdateForm=this.formBuilder.group({
      productId:[this.product.productId],
      categoryId:[this.product.categoryId],
      productName:[this.product.productName],
      productDescription:[this.product.productDescription],
      productImage:[this.product.productImage],
      productStock:[this.product.productStock],
      productPrice:[this.product.productPrice],
      productStatus:[this.product.productStatus],
    })
  }
  uploadFinished = (event) => { 
    this.sayac++
      this.resp = event; 
  }

   createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
  }


}