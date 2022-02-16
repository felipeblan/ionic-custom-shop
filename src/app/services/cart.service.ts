import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: string;
  price: string;
  img: string;
  title: string;
  desc: string;
  category: string;
}

@Injectable({
  providedIn: 'root',
})

export class CartService {

  private cart: any = {};
  private cartItems: BehaviorSubject<any> = new BehaviorSubject<any>(0);

  constructor() {}

  /**
   * Add product to the cart
   * @param product 
   */
  addProduct(product: Product) {
    if (!this.cart[product.id]) {
      this.cart[product.id] = { amount: 1, ...product };
    } else {
      this.cart[product.id].amount += 1;
    }
    this.cartItems.next(this.cartItems.value + 1);
  }

  /**
   * Get number of items through beahvior subject
   * @returns 
   */
  getCartCount() {
    return this.cartItems.asObservable();
  }


  /**
   * Get all cart items as array
   * @returns 
   */
  getCart() {
    const cartItems = [];
    Object.entries(([key, value]) => cartItems.push(value));
    return cartItems;
  }
}
