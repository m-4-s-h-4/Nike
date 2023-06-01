import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import Product from '../types/product.model';


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public search = new BehaviorSubject<string>("");
  public selectedCategory = new BehaviorSubject<string>("");
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  products$ = ajax.getJSON<Product[]>('/assets/store.json');

  filteredProducts$ = combineLatest([this.products$, this.selectedCategory])
    .pipe(
      map(([products, selectedCategory]) => {
        if (!selectedCategory) return products;
        return products.filter(product => product.category === selectedCategory);
      })
    );

  total$ = this.cartItems$.pipe(
    map((items: Product[]) => {
      return items.reduce((acc, item) => acc + item.price, 0);
    })
  );

  changeCategory(category: string) {
    this.selectedCategory.next(category);
  }

  addItemsToCart(product: Product) {
    const currentItems = this.cartItemsSubject.getValue();
    const newItems = [...currentItems, product];
    this.cartItemsSubject.next(newItems);
  }

  removeItem(index: number) {
    const currentItems = this.cartItemsSubject.getValue();
    const newItems = currentItems.filter((item, i) => i !== index);
    this.cartItemsSubject.next(newItems);
  }

  constructor() { }
}
