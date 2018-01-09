import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
import { Curve } from './curve';

@Pipe({
  name: 'daysFilter'
})
export class DaysFilterPipe implements PipeTransform {
  // returns ether curve object or curve array, so I used any.
  transform(chartData: Curve[], args: number): any {
    if (chartData) {
      chartData.forEach(e => { console.log(e) })
      return null;
    }
  }

}
