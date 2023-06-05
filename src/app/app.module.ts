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
import { SuccessMessageComponent } from './components/success-message/success-message.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FilterPipe,
    ItemsComponent,
    CartComponent,
    SuccessMessageComponent,
    CheckoutFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
