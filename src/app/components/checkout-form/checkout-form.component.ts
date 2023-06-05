import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({});
  countryChangeSubscription: Subscription = new Subscription();

  constructor(private fb: FormBuilder) { }

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
      if (value === 'Spain') {
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
    console.log(this.form.value);
  }
}
