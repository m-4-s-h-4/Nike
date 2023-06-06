import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../../types/product.model';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$: Observable<Product[]>;
  total$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.cartItems$;
    this.total$ = this.cartService.total$;
  }

  removeItem(index: number): void {
    this.cartService.removeItem(index);
  }
}
