import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({});
  countryChangeSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', Validators.required],
      address: ['', Validators.required],
      zip: ['', Validators.required],
      state: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    });

    this.countryChangeSubscription = this.form.get('country')!.valueChanges.subscribe(value => {
      if (value === 'USA') {
        this.form.get('state')!.clearValidators();
      } else {
        this.form.get('state')!.setValidators([Validators.required]);
      }
      this.form.get('state')!.updateValueAndValidity();
    });
  }

  ngOnDestroy() {
    this.countryChangeSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.sendEmail();
  }

  sendEmail() {
    this.http.post('http://localhost:3000/orders', {
      subject: 'Order confirmation',
      email: `
        <h1>Your order was placed and will be shipped soon!</h1>
        <img src="https://thumb.ac-illust.com/03/032dcdbe757be7a65e5825910f1898da_t.jpeg">
      `,
    }, { responseType: 'text' }).subscribe((res) => {
      // navigating here instead of html so that form is not destroyed like when i had it in html
      this.router.navigate(['/success']);
    });
  }
}  