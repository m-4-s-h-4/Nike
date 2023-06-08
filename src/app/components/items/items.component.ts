import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../../types/product.model';
import { CartService } from 'src/app/services/cart/cart.service';
import { StoreService } from 'src/app/services/store/store.service';
import { FilterPipe } from '../../pipe/filter.pipe';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  providers: [FilterPipe]
})
export class ItemsComponent implements OnInit {
  currentPage$ = this.storeService.currentPage$;
  totalPages$ = this.storeService.totalPages$;
  products$: Observable<Product[]>;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchKey: string = "";

  constructor(
    public storeService: StoreService,
    private cartService: CartService,
    private filterPipe: FilterPipe
  ) {
    this.products$ = this.storeService.filteredProducts$;

    this.storeService.search.subscribe((val: any) => {
      this.searchKey = val;
      this.filterProducts();
    });
  }

  ngOnInit(): void {
    this.products$.subscribe(products => {
      this.products = products;
      this.filterProducts();
    });
  }

  filterProducts(): void {
    this.filteredProducts = this.filterPipe.transform(this.products, this.searchKey, 'title');
  }

  highlightTitle(title: string): string {
    if (this.searchKey && title) {
      return title.replace(new RegExp(this.searchKey, 'gi'), '<span class="match">$&</span>');
    }
    return title;
  }

  nextPage(): void {
    this.storeService.nextPage();
  }

  prevPage(): void {
    this.storeService.prevPage();
  }

  addItemsToCart(product: Product): void {
    this.cartService.addItemsToCart(product);
  }
}
