import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../../types/product.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cartItems$: Observable<Product[]>;
  total$: Observable<number>;

  constructor(private storeService: StoreService) {
    this.cartItems$ = this.storeService.cartItems$;
    this.total$ = this.storeService.total$;
  }

  removeItem(index: number): void {
    this.storeService.removeItem(index);
  }
}
