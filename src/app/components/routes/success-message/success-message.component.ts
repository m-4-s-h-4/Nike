import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  // This is the option that uses the package's AnimationOptions interface  
  options: AnimationOptions = {
    path: '/assets/lottie.json'
  };

  constructor() { }

  ngOnInit(): void { }

  // This is the component function that binds to the animationCreated event from the package  
  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
