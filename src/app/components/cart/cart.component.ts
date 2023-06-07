import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../../types/product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$: Observable<Product[]>;
  total$: Observable<number>;
  checkoutPage: boolean;

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems$ = this.cartService.cartItems$;
    this.total$ = this.cartService.total$;
    this.checkoutPage = this.router.url === '/checkout';
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }
}
