import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import Product from "../../types/product.model";
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  public search = new BehaviorSubject<string>("");
  public selectedCategory = new BehaviorSubject<string>("");
  private currentPage = new BehaviorSubject<number>(1);

  products$ = ajax.getJSON<Product[]>('/assets/store.json');

  filteredProducts$ = combineLatest([this.products$, this.selectedCategory, this.currentPage])
    .pipe(
      map(([products, selectedCategory, currentPage]) => {
        let filteredProducts = products;
        if (selectedCategory) {
          filteredProducts = products.filter(product => product.category === selectedCategory);
        }
        const itemsPerPage = 4;
        const totalItems = filteredProducts.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);

        if (currentPage > totalPages) {
          currentPage = totalPages;
          this.currentPage.next(currentPage);
        }

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        return filteredProducts.slice(start, end);
      })
    );


  changeCategory(category: string) {
    this.selectedCategory.next(category);
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
