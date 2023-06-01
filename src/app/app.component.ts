import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Product from './types/product.model';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Nike';
  searchKey: string = "";
  products$: Observable<Product[]>;
  cartItems$: Observable<Product[]>;
  total$: Observable<number>;

  constructor(private storeService: StoreService) {
    this.products$ = this.storeService.filteredProducts$;
    this.cartItems$ = this.storeService.cartItems$;
    this.total$ = this.storeService.total$;
  }

  ngOnInit(): void {
    this.storeService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }

  nextPage(): void {
    this.storeService.nextPage();
  }

  prevPage(): void {
    this.storeService.prevPage();
  }

  addItemsToCart(product: Product): void {
    this.storeService.addItemsToCart(product);
  }

  removeItem(index: number): void {
    this.storeService.removeItem(index);
  }
}
