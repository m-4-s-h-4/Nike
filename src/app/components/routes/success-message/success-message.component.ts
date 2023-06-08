import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-success-message',
  templateUrl: './success-message.component.html',
  styleUrls: ['./success-message.component.css']
})
export class SuccessMessageComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/lottie.json'
  };

  constructor() { }

  ngOnInit(): void { }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
}
