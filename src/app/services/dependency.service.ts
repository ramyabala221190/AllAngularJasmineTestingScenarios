import { Injectable } from '@angular/core';
import { SimpleService } from './simple.service';

@Injectable({
  providedIn: 'root'
})
export class DependencyService {

  constructor(private simpleService:SimpleService) { }

  addingAMessage(message:string){
    this.simpleService.addMessage(message);
  }

  clearingMessage(){
    this.simpleService.clearMessage();
  }
}

