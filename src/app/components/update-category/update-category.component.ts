import { CategoryService } from './../../services/category.service';
import { Category } from 'src/app/models/category';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss']
})
export class UpdateCategoryComponent implements OnInit{
  categoryUpdateForm:FormGroup;
  categoryId:number;
  category:Category;

  constructor(private formBuilder:FormBuilder,private activatedroute:ActivatedRoute,
    private categoryService:CategoryService,private router:Router) {this.initForm(); }

  ngOnInit(): void {

    
    this.activatedroute.params.subscribe(params=>{
      if(params["categoryId"]){
        this.categoryId=params["categoryId"]
        this.getCategoryById(params["categoryId"])}
      else{
        this.getCategoryById(params["categoryId"])
      }
      })
      
      
  }

  createCategoryUpdateForm(){
    this.categoryUpdateForm=this.formBuilder.group({
      categoryId:this.categoryId,
      categoryName:[this.category.categoryName,Validators.required],
      categoryDescription:[this.category.categoryDescription,Validators.required],
    })

  }
  initForm() :void {
    this.categoryUpdateForm=this.formBuilder.group({
      categoryID:[null],
      categoryName:[null],
      categoryDescription:[null,Validators.required],
    })
  }

  update(){
    if(this.categoryUpdateForm.valid){
      let categoryModel =Object.assign({},this.categoryUpdateForm.value) 
      this.categoryService.update(categoryModel).subscribe(response=>{
     
        this.router.navigate(["admin/listCategory"])
      });
    }
    else {
  
    } 
  }
  getCategoryById(categoryId:number){
    this.categoryService.getCategoryById(categoryId).subscribe((response) => {
      this.category=response.data;
      this.createCategoryUpdateForm();
    });
  }


}