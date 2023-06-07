import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/routes/not-found/not-found.component';
import { CheckoutComponent } from './components/routes/checkout/checkout.component';
import { HomeComponent } from './components/routes/home/home.component';
import { SuccessMessageComponent } from './components/routes/success-message/success-message.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'success',
    component: SuccessMessageComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
