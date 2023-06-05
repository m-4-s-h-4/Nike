import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import Product from '../../types/product.model';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  products$: Observable<Product[]>;
  searchKey: string = "";

  constructor(private storeService: StoreService) {
    this.products$ = this.storeService.filteredProducts$;

    this.storeService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
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
    this.storeService.addItemsToCart(product);
  }
}
