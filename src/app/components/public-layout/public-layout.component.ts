import { AfterViewInit, Component } from '@angular/core';
import { get } from 'scriptjs';
@Component({
  selector: 'app-public-layout',
  templateUrl: './public-layout.component.html',
  styleUrls: ['./public-layout.component.scss']
})
export class PublicLayoutComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    
  }

  loadCustomJsFiles(): void {
    get("assets/thema/js/owl.carousel.min.js", () => {});
   
  }
}
