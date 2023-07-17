import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CKEditorModule } from 'ckeditor4-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicLayoutComponent } from './components/public-layout/public-layout.component';
import { PrivateLayoutComponent } from './components/private-layout/private-layout.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main.component';
import { ProductSidebarComponent } from './components/product-sidebar/product-sidebar.component';
import { PublicHeaderComponent } from './components/public-header/public-header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

import { BasketComponent } from './components/basket/basket.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ListCategoryComponent } from './components/list-category/list-category.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ListProductComponent } from './components/list-product/list-product.component';
import { UploadsComponent } from './components/uploads/uploads.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { UpdateCategoryComponent } from './components/update-category/update-category.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ProductPipe } from './pipe/product.pipe';
import { CkeditorTestComponent } from './components/ckeditor-test/ckeditor-test.component';


@NgModule({
  declarations: [
    AppComponent,
    PublicLayoutComponent,
    PrivateLayoutComponent,
    LoginComponent,
    NavbarComponent,
    HeaderComponent,
    MainComponent,
    ProductSidebarComponent,
    PublicHeaderComponent,
    FooterComponent,
    AddCategoryComponent,
    BasketComponent,
    ProductDetailsComponent,
    ListCategoryComponent,
    AddProductComponent,
    ListProductComponent,
    UploadsComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    CarouselComponent,
    UserLoginComponent,
    ProductPipe,
    CkeditorTestComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
