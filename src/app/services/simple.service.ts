import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SimpleService {

  constructor() { }

  messages:string[]=[];

  addMessage(message:string){
    this.messages.push(message);
    console.log(this.messages)
  }

  clearMessage(){
    this.messages=[];
  }

}
