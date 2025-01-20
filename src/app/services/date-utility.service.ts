import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateUtilityService {

  constructor() { }

  isItToday(date:string){
     const givenDate=moment(date).format('YYYY-MM-DD');
     const todayDate=moment(new Date()).format('YYYY-MM-DD');
     return moment(givenDate).isSame(moment(todayDate),'day') ? "today" : moment(givenDate).isBefore(moment(todayDate)) ? "past": "future";
  }
}
