import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'daysLeft',
})
export class DaysLeftPipe implements PipeTransform {
  transform(value: Date): string {
    if (moment(value).diff(Date.now(), 'days') < 1) {
      return 'Due today';
    }
    return moment(Date.now()).from(value, true) + ' left';
  }
}
