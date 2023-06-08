import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipe/filter.pipe';
import { RouterModule } from '@angular/router';
import { ItemsComponent } from './components/items/items.component';
import { CartComponent } from './components/cart/cart.component';
import { SuccessMessageComponent } from './components/routes/success-message/success-message.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { NotFoundComponent } from './components/routes/not-found/not-found.component';
import { HomeComponent } from './components/routes/home/home.component';
import { CheckoutComponent } from './components/routes/checkout/checkout.component';
import { LottieModule } from 'ngx-lottie';
import { HttpClientModule } from '@angular/common/http';
import { APP_SETTINGS_TOKEN, appSettings } from './app.settings';
import { APP_INITIALIZER } from '@angular/core';
import { StoreService } from './services/store/store.service';

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
    CartComponent,
    SuccessMessageComponent,
    CheckoutFormComponent,
    NotFoundComponent,
    HomeComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule
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
