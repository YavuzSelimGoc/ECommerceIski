import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-sidebar',
  templateUrl: './product-sidebar.component.html',
  styleUrls: ['./product-sidebar.component.scss']
})
export class ProductSidebarComponent implements OnInit{
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
}
