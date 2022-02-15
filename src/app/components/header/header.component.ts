import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import categoryData from 'src/assets/company/categories.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent implements OnInit {

  @Input() title: string;
  dropdown: boolean = false;
  @ViewChild("productBtn", { read: ElementRef }) productBtn: ElementRef;
  categories: Array<any> = categoryData;

  constructor() { }

  ngOnInit() {}

  hideDropdown(event : any) {
    const xTouch = event.clientX; 
    const yTouch = event.clientY;
    const rect = this.productBtn.nativeElement.getBoundingClientRect(); 
    const topBoundary = rect.top+2;
    const leftBoundary = rect.left+2;
    const rightBoundary = rect.right-2;

    if (xTouch < leftBoundary || xTouch > rightBoundary || yTouch < topBoundary) {
      this.dropdown = false; 
    }
  }

}
