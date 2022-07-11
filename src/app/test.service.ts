import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http:HttpClient) { }


  getUsers(){
    return this.http.get('https://jsonplaceholder.typicode.com/users/1').pipe(
      map(x=>x),
      catchError(err=>throwError(err))
    )
  }
}
