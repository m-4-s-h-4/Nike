import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from './store.service';
import Product from './types/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  searchKey: string = "";
  products$: Observable<Product[]>;
  cartItems$: Observable<Product[]>;
  total$: Observable<number>;

  ngOnInit(): void {
    this.storeService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }


  constructor(private storeService: StoreService) {
    this.products$ = this.storeService.products$;
    this.cartItems$ = this.storeService.cartItems$;
    this.total$ = this.storeService.total$;
  }

  addItemsToCart(product: Product): void {
    this.storeService.addItemsToCart(product);
  }

  removeItem(index: number): void {
    this.storeService.removeItem(index);
  }
}
