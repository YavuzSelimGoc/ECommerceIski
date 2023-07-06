import { CategoryService } from './../../services/category.service';
import { ProductService } from './../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productAddForm:FormGroup;
  public resp: {dbPath:''};
  category:Category[]
  constructor(private httpClient:HttpClient,private formBuilder:FormBuilder,private categoryService:CategoryService,private productService:ProductService,private router:Router) { }
  ngOnInit(): void {
   this.createProductAddForm()
   this.getCategory()
  }
  getCategory() {
    this.categoryService.getCategory().subscribe(repsonse => {
      this.category = repsonse.data  
    })
  }
  createProductAddForm(){
    this.productAddForm=this.formBuilder.group({
      productName:["",Validators.required],
      categoryId:["",Validators.required],
      productDescription:["",Validators.required],
      productStock:["",Validators.required],
      productImage:["",Validators.required],
      productPrice:["",Validators.required],
    })
  }
  add(){
    this.productAddForm.controls['productImage'].setValue(this.resp.dbPath);
    if(this.productAddForm.valid){
      let productModel =Object.assign({},this.productAddForm.value) 
      this.productService.add(productModel).subscribe(response=>{
        this.router.navigate(["/admin/listProduct"])
      });
    }
    else {
      console.log("Kategori Eklenemedi");
    } 
  }
  uploadFinished = (event) => { 
    this.resp = event; 
  }

   createImgPath = (serverPath: string) => { 
    return environment.imgUrl+`${serverPath}`; 
    
  }

}