import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LottieModule } from 'ngx-lottie';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../components/cart/cart.component';
import { SuccessMessageComponent } from '../components/routes/success-message/success-message.component';
import { CheckoutFormComponent } from '../components/checkout-form/checkout-form.component';
import { CheckoutComponent } from '../components/routes/checkout/checkout.component';

export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [
    CartComponent,
    SuccessMessageComponent,
    CheckoutFormComponent,
    CheckoutComponent,
  ],

  imports: [
    RouterModule,
    ReactiveFormsModule,
    LottieModule.forRoot({ player: playerFactory }),
    HttpClientModule,
    CommonModule
  ],

  exports: [
    CartComponent,
    SuccessMessageComponent,
    CheckoutFormComponent,
    CheckoutComponent,
  ]
})

export class CartCheckoutModule { }
