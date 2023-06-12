import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, combineLatest, map } from "rxjs";
import Product from "../../types/product.model";
import { HttpClient } from "@angular/common/http";
import { APP_SETTINGS_TOKEN, APP_SETTINGS } from '../../app.settings';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  products$ = new BehaviorSubject<Product[]>([]);
  public search = new BehaviorSubject<string>("");
  public selectedCategory$ = new BehaviorSubject<string>("");

  public categoryItemCounter$ = this.products$.pipe(
    map(products =>
      products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number })
    )
  );

  private pageSize: number;
  public totalPages$ = new BehaviorSubject<number>(1);
  public currentPage$ = new BehaviorSubject<number>(1);
  public pageNumbers$ = this.totalPages$.pipe(
    map(totalPages => Array.from({ length: totalPages }, (_, i) => i + 1))
  );

  constructor(private http: HttpClient, @Inject(APP_SETTINGS_TOKEN) private settings: APP_SETTINGS) {
    this.pageSize = settings.pageSize;
  }

  loadProducts(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      this.http.get<Product[]>(this.settings.dataSourceURL[this.settings.language]).subscribe({
        next: (products) => {
          if (!products) {
            reject('Products not loaded');
          }
          this.products$.next(products);
          resolve(products);
        },
        error: (error) => {
          this.products$.next([]);
          reject(error);
        }
      });
    });
  }

  categories$ = this.products$
    .pipe(
      map(products => products.map(product => product.category)),
      map(categories => [...new Set(categories)])
    );

  filteredProducts$ = combineLatest([this.products$, this.selectedCategory$, this.currentPage$])
    .pipe(
      map(([products, selectedCategory, currentPage]) => {
        let filteredProducts = products;
        if (selectedCategory) {
          filteredProducts = products.filter(product => product.category === selectedCategory);
        }
        const totalItems = filteredProducts.length;
        const totalPages = Math.ceil(totalItems / this.pageSize);

        this.totalPages$.next(totalPages);

        if (currentPage > totalPages) {
          currentPage = totalPages;
          this.currentPage$.next(currentPage);
        }

        const start = (currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;

        return filteredProducts.slice(start, end);
      })
    );

  changeCategory(category: string) {
    this.selectedCategory$.next(category);
  }

  nextPage(): void {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  prevPage(): void {
    if (this.currentPage$.value > 1) {
      this.currentPage$.next(this.currentPage$.value - 1);
    }
  }

  firstPage(): void {
    this.currentPage$.next(1);
  }

  lastPage(): void {
    this.currentPage$.next(this.totalPages$.value);
  }
}

