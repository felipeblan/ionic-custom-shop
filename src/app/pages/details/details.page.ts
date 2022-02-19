import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import productData from 'src/assets/company/menu.json';
import categoryData from 'src/assets/company/categories.json';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  product: any = null;
  category: any = null;

  constructor(private route: ActivatedRoute,
              private cartSrv: CartService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.product = productData.find((product) => product.id == id);
    this.category = categoryData.find((category) => category.id == this.product?.category);
  }

  /**
   * Add product to the cart
   */
  addToCart() {
    this.cartSrv.addProduct(this.product);
  }

}
