import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({
  name: 'dateCustom'
})
export class DateCustomPipe implements PipeTransform {

  transform(date: any): any {
    return dayjs(date).format('MM/DD/YYYY');
  }

}
