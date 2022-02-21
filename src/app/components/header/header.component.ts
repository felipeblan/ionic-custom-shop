import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AnimationController, ModalController } from '@ionic/angular';
import { CartModalPage } from 'src/app/pages/cart-modal/cart-modal.page';
import { CartService } from 'src/app/services/cart.service';
import categoryData from 'src/assets/company/categories.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  dropdown: boolean = false;
  categories: Array<any> = categoryData;

  @ViewChild('cartBtnMobile', { read: ElementRef }) cartBtnMobile: ElementRef;
  @ViewChild('productBtn', { read: ElementRef }) productBtn: ElementRef;
  @ViewChild('cartBtnWeb', { read: ElementRef }) cartBtnWeb: ElementRef;
  cartCount: number = 0;
  darkMode : boolean = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  constructor(
    private animationCtrl: AnimationController,
    private cartSrv: CartService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.cartSrv.getCartCount().subscribe((cartCount) => {
      if (cartCount > 0) {
        this.animateCart();
      }
      this.cartCount = +cartCount;
    });

    this.toggleDarkMode(this.darkMode);

    const prefersDark: any = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (e) => {
      const dark = e.matches ? true : false;
      if (this.darkMode != dark) {
        this.darkMode = !this.darkMode;
        this.toggleDarkMode(this.darkMode);
      }
    });

  }

  hideDropdown(event: any) {
    const xTouch = event.clientX;
    const yTouch = event.clientY;
    const rect = this.productBtn.nativeElement.getBoundingClientRect();
    const topBoundary = rect.top + 2;
    const leftBoundary = rect.left + 2;
    const rightBoundary = rect.right - 2;

    if (
      xTouch < leftBoundary ||
      xTouch > rightBoundary ||
      yTouch < topBoundary
    ) {
      this.dropdown = false;
    }
  }

  /**
   * Animate counter for cart
   */
  animateCart() {
    const keyframes = [
      { offset: 0, transform: 'scale(1)' },
      { offset: 0.5, transform: 'scale(1.2)' },
      { offset: 0.8, transform: 'scale(0.9)' },
      { offset: 1, transform: 'scale(1)' },
    ];

    const cartAnimationWeb = this.animationCtrl
      .create('web')
      .addElement(this.cartBtnWeb.nativeElement)
      .duration(600)
      .keyframes(keyframes);
    cartAnimationWeb.play();
    const cartAnimationMobile = this.animationCtrl
      .create('mobile')
      .addElement(this.cartBtnMobile.nativeElement)
      .duration(600)
      .keyframes(keyframes);
    cartAnimationMobile.play();
  }

  /**
   * Open cart modal
   */
  async openCart() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'custom-modal',
    });
    await modal.present();
  }

  /**
   * Toggle dark mode
   * @param enable 
   */
  toggleDarkMode(enable: boolean) {
    document.body.classList.toggle('dark', enable);
  }

  changeDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }
}
