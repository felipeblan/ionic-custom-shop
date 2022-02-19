import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})

export class CartModalPage implements OnInit {

  cart: any = [];
  cartSum: number = 0;

  constructor(private cartSrv: CartService,
              private modalCtrl: ModalController) { }

  ngOnInit() {
    this.cart = this.cartSrv.getCart();
    this.cartSum = this.cart.reduce((val: number, item: any) => val += +item.price, 0);
  }

  /**
   * Dismissed modal
   */
  dismiss() {
    this.modalCtrl.dismiss();
  }

}
