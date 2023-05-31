import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from './store.service';
import Product from './types/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products$: Observable<Product[]>;
  cartItems$: Observable<Product[]>;
  total$: Observable<number>;

  constructor(private storeService: StoreService) {
    this.products$ = this.storeService.products$;
    this.cartItems$ = this.storeService.cartItems$;
    this.total$ = this.storeService.total$;
  }

  addItemsToCart(product: Product): void {
    this.storeService.addItemsToCart(product);
  }

  removeItemFromCartByIndex(index: number): void {
    this.storeService.removeItemFromCartByIndex(index);
  }
}
