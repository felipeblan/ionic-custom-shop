import { Component, HostListener, OnInit } from '@angular/core';
import { isPlatform, MenuController, Platform } from '@ionic/angular';
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
      children: categoryData
    },
    {
      title: "About", 
      icon: "information", 
      path: "/about"
    },
  ];

  title: string = "Home";

  constructor(private menuCtrl: MenuController,
              private plt: Platform) { }

  ngOnInit() {
    const headerHeight = isPlatform("ios") ? 44 : 56;
    document.documentElement.style.setProperty(
      "--header-height",
      `${headerHeight}px`
    );
    const width = this.plt.width(); 
    this.toggleMenu(width);
  }

  setTitle(title: string) {
    this.title = title;
  }

  @HostListener("window:resize", ["$event"])
  private onResize(event : any) {
    const newWidth = +event.target.innerWidth;
    this.toggleMenu(newWidth);
  }

  toggleMenu(width : number) {
    if (width > 768) {
      this.menuCtrl.enable(false, "myMenu");
    } else {
      this.menuCtrl.enable(true, "myMenu");
    }
  }
}
