import { Component } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  time = 0;
  counter = 0;
  condition = false;
  sub: Subscription;
  subWait: Subscription;

  onStartStopClick() {
    this.condition = !this.condition;
    if(this.condition) {
      const stream$: Observable<number> = new Observable(observer => {
        setInterval(() => {
          observer.next(1);
        }, 1000);
      });

      this.sub = stream$.subscribe(value => {
        this.time += value;
      });

      this.counter = 0;
    } else {
      this.sub.unsubscribe();
      this.time = 0;
    }
  }


  onWaitClick() {
    if(this.counter !== 0 && this.counter <= 300) {
      this.sub.unsubscribe();
      this.subWait.unsubscribe();
      this.condition = false;
      this.counter = 0;
    }

    this.subWait = interval(1).subscribe(value => {
      if (value === 300) {
        this.subWait.unsubscribe();
        this.counter = 0;
      } else {
        this.counter = value;
      }
    });


  }
  onResetClick() {
    this.time = 0;
    if(this.condition) {
      return
    }
    this.onStartStopClick();
  }
}
