import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
import { Curve } from './curve';

@Pipe({
  name: 'daysFilter'
})

export class DaysFilterPipe implements PipeTransform {
  // returns ether curve object or curve array, so I used any.
  transform(chartData: Curve[], days: number): any {
    const checkToday = (targetDate)=> {
      return chartData
        .filter(curve => moment(curve.date, 'MM-DD-YYYY')
          .isBefore(targetDate, 'day'));
    };

    if (chartData) {
      // addd # days to today
      const targetDate = moment().add(days, 'days');
      return checkToday(targetDate);
    }
  }
}
