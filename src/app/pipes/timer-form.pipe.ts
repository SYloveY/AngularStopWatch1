import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'timerForm'
})
export class TimerFormPipe implements PipeTransform {
  transform(time: number): string {
    const s: any = time % 60;
    const m: any = Math.floor((time / 60) % 60);
    const h: any = Math.floor((time / 60) / 60);

    const timeItems = [h, m, s].map(timeItem => {
      if(timeItem < 10) {
        return timeItem = '0' + timeItem;
      } else {
        return timeItem;
      }
    });

    return `${timeItems[0]}:${timeItems[1]}:${timeItems[2]}`;
  }
}
