import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/error.json'
  };

  constructor() { }

  ngOnInit(): void { }

  onAnimate(animationItem: AnimationItem): void {
    console.log(animationItem);
  }
} {

}
