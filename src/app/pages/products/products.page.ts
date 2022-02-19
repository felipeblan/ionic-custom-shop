import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import productData from "../../../assets/company/menu.json";
import categoryData from "../../../assets/company/categories.json";
import { ModalController } from '@ionic/angular';
import { FilterModalPage } from '../filter-modal/filter-modal.page';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})

export class ProductsPage implements OnInit {
  products: Array<any> = [];

  constructor(
    private route: ActivatedRoute,
    private cartSrv: CartService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.filterProducts(params.category);
    });
  }

  /**
   * Filter products according to the category
   * @param category
   */
  filterProducts(category = null) {
    if (!category) {
      this.products = productData;
    } else {
      const cat = categoryData.find((item) => item.slug === category);
      this.products = productData.filter((p) => p.category == cat.id);
    }
  }

  addProduct(product) {
    this.cartSrv.addProduct(product);
  }

  /**
   * Open modal to filter products
   */
  async openFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterModalPage,
      breakpoints: [0, 0.5],
      initialBreakpoint: 0.5,
      handle: false,
      componentProps: {
        categories: categoryData,
      },
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    console.log(data);
    if (data) {
      this.filterProducts(data.category?.slug);
    }

  }
}
