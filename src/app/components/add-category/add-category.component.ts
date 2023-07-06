import { CategoryService } from './../../services/category.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  categoryAddForm:FormGroup;
  constructor(private httpClient:HttpClient,private formBuilder:FormBuilder,private categoryService:CategoryService,private router:Router) { }
  ngOnInit(): void {
   this.createCategoryAddForm()
  }
  createCategoryAddForm(){
    this.categoryAddForm=this.formBuilder.group({
      categoryName:["",Validators.required],
      categoryDescription:["",Validators.required],
    })
  }
  add(){
    if(this.categoryAddForm.valid){
      let categoryModel =Object.assign({},this.categoryAddForm.value) 
      this.categoryService.add(categoryModel).subscribe(response=>{
        this.router.navigate(["/admin/listCategory"])
      });
    }
    else {
      console.log("Kategori Eklenemedi");
    } 
  }

}