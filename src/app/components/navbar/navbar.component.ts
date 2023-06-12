import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public searchTerm: string = '';
  public categories$: Observable<string[]>;
  numberOfItems$: Observable<{ [key: string]: number; }> | undefined;

  constructor(private storeService: StoreService) {
    this.categories$ = this.storeService.categories$;
  }

  ngOnInit(): void {
    this.numberOfItems$ = this.storeService.categoryItemCounter$;
  }

  changeCategory(category: string) {
    this.storeService.changeCategory(category);
  }

  itemCategory(): string {
    return this.storeService.selectedCategory$.value;
  }

  resetCategory() {
    this.storeService.changeCategory('');
  }

  search(event: any) {
    this.searchTerm = (event?.target as HTMLInputElement).value;
    this.storeService.search.next(this.searchTerm);
  }
}
