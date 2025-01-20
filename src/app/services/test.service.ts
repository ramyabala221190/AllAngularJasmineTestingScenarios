import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { SimpleService } from './simple.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient,private simpleService:SimpleService) { }

  addMessageForUser(message:string){
    this.simpleService.addMessage(message)
  }

  clearMessages(){
    this.simpleService.clearMessage();
  }


  createAsyncTask(){
    setTimeout(()=>{
      console.log("Executing after 250ms");
    },250)
  }

  createAsyncTaskWithPromises(){
     console.log("executing after promise resolves");
  }



  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users/1').pipe(
      map(x=>x),
      catchError(err=>throwError(err))
    )
  }

  createToDo(){
    let newToDo= {
      "userId": 1,
      "id": 20,
      "title": "Shopping",
      "completed": false
    }
    return this.http.post('https://jsonplaceholder.typicode.com/todos/1',newToDo).pipe(
      map(x=>x),
      catchError(err=>throwError(err))
    )
  }


}
