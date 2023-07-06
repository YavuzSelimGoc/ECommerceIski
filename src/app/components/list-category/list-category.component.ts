import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  category:Category[]=[]
  constructor(private httpClient:HttpClient,private categoryService:CategoryService){ }
  ngOnInit(): void {
  this.getCategory()
  }
  getCategory() {
    this.categoryService.getCategory().subscribe(repsonse => {
      this.category = repsonse.data  
    })
  }
  delete(category:Category){
    this.categoryService.delete(category).subscribe(response=>{
    
    });
  }
  passive(category:Category){
    this.categoryService.passive(category).subscribe(response=>{
    
    });
  }
  active(category:Category){
   this.categoryService.active(category).subscribe(response=>{
   });
  
  }

}