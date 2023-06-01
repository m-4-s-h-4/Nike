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
  private currentPage = new BehaviorSubject<number>(1);
  cartItems$ = this.cartItemsSubject.asObservable();
  products$ = ajax.getJSON<Product[]>('/assets/store.json');

  filteredProducts$ = combineLatest([this.products$, this.selectedCategory, this.currentPage])
    .pipe(
      map(([products, selectedCategory, currentPage]) => {
        let filteredProducts = products;
        if (selectedCategory) {
          filteredProducts = products.filter(product => product.category === selectedCategory);
        }
        const itemsPerPage = 4;
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return filteredProducts.slice(start, end);
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

  nextPage(): void {
    this.currentPage.next(this.currentPage.value + 1);
  }

  prevPage(): void {
    if (this.currentPage.value > 1) {
      this.currentPage.next(this.currentPage.value - 1);
    }
  }

  constructor() { }
}
