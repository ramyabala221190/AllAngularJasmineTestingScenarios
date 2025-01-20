import { Pipe, PipeTransform } from '@angular/core';
import { DateUtilityService } from '../services/date-utility.service';

@Pipe({
  name: 'dateCheck'
})
export class DateCheckPipe implements PipeTransform {

  constructor(private dateUtilityService:DateUtilityService){}

  transform(date: string): string {
    return this.dateUtilityService.isItToday(date)
  }

}
