import { Component, OnInit } from '@angular/core';
import { isPlatform } from '@ionic/angular';
import { MenuItemI } from 'src/app/interfaces/menu-item.interface';
import categoryData from 'src/assets/company/categories.json';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})

export class MenuPage implements OnInit {

  menuItems: Array<MenuItemI> = [
    {
      title: "Home", 
      icon: "home", 
      path: "/"
    },
    {
      title: "Products", 
      icon: "list", 
      path: "/products",
      chidren: categoryData
    },
    {
      title: "About", 
      icon: "information", 
      path: "/about"
    },
  ];

  title: string = "Home";

  constructor() { }

  ngOnInit() {
    const headerHeight = isPlatform("ios") ? 44 : 56;
    document.documentElement.style.setProperty(
      "--header-height",
      `${headerHeight}px`
    );
  }

  setTitle(title: string) {
    this.title = title;
  }

}
