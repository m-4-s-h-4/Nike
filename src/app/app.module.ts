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

// Add these two
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

// Export this function
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
    ReactiveFormsModule, // Add the module like so:    
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
