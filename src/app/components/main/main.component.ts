import { Component } from '@angular/core';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
      transition('* => void', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class MainComponent {
  current = 0;
  items = [1, 2, 3, 4, 5, 6, 7];
  ngOnInit() {
    setInterval(() => {
      this.next();
    }, 5000);
  }
  prev() {
   

    if (this.current == 0) {
      this.current = this.items.length - 1;
    } else {
      this.current--;
    }
  }

  next() {
   
    if (this.current == this.items.length - 1) {
      this.current = 0;
    } else {
      this.current++;
    }
  }
}
