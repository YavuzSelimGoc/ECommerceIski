import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';

const routes: Routes = [
  {
    path: "", component: PublicLayoutComponent, children: [
      {path:"",pathMatch:"full",component:NavbarComponent},
  
     
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
     // { path: "", pathMatch: "full", component: AdminIndexComponent },
 
    ]
  }



 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }