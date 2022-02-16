import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import productData from "../../../assets/company/menu.json";
import categoryData from "../../../assets/company/categories.json";

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})

export class ProductsPage implements OnInit {
  products: Array<any> = [];

  constructor(private route: ActivatedRoute, private cartSrv: CartService) {}

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
}
