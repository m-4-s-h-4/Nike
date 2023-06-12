import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FilterPipe } from './pipe/filter.pipe';
import { ItemsComponent } from './components/items/items.component';
import { NotFoundComponent } from './components/routes/not-found/not-found.component';
import { HomeComponent } from './components/routes/home/home.component';
import { APP_SETTINGS_TOKEN, appSettings } from './app.settings';
import { StoreService } from './services/store/store.service';
import { CartCheckoutModule } from './cart-checkout/cart-checkout.module';

export function initializeApp(storeService: StoreService): () => Promise<any> {
  return () => storeService.loadProducts();
}

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilterPipe,
    ItemsComponent,
    NotFoundComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule,
    CartCheckoutModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [StoreService],
      multi: true
    },
    {
      provide: APP_SETTINGS_TOKEN,
      useValue: appSettings
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
