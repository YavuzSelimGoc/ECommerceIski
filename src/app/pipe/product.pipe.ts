import { ProductDto } from './../models/productDto';
import { Product } from './../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'product'
})
export class ProductPipe implements PipeTransform {

 
  transform(value: ProductDto[], filtertext: string): ProductDto[] {
    filtertext=filtertext?filtertext.toLocaleLowerCase():""
    return filtertext?value.filter((p:ProductDto)=>p.productName.toLocaleLowerCase()
    .indexOf(filtertext)!==-1):value;
  }

}
