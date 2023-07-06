import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { BasketComponent } from './components/basket/basket.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { MainComponent } from './components/main/main.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';

const routes: Routes = [
  {
    path: "", component: PublicLayoutComponent, children: [
      {path:"",pathMatch:"full",component:MainComponent},
      {path:"sepet",component:BasketComponent},
      {path:"productDetails",component:ProductDetailsComponent},
    ]
  },
  {
    path: "login", component: LoginComponent, children: [
      { path: "", pathMatch: "full", component: LoginComponent },
      { path: "login", component: LoginComponent },
    ]
  },
  {
    path: "admin", component: PrivateLayoutComponent, children: [
     { path: "addCategory", pathMatch: "full", component: AddCategoryComponent },
     { path: "listCategory", pathMatch: "full", component: ListCategoryComponent },
     { path: "addProduct", pathMatch: "full", component: AddProductComponent },
     { path: "listProduct", pathMatch: "full", component: ListProductComponent },
     {path:"updateProduct/product/:productId",component:UpdateProductComponent},
     {path:"updateCategory/category/:categoryId",component:UpdateCategoryComponent},
 
    ]
  }



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }