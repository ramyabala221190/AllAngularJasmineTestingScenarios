import { Component, OnInit } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private testService:TestService) { }

  ngOnInit(): void {
  }


  heading1:string="My First Heading";
  heading2:string="My Second Heading";
  

  todosList:any[]=[];

  addToDo(todoTitle:string){
    this.todosList.push({
      "userId": 1,
      "id": 3,
      "title": todoTitle,
      "completed": false
    })
  }

  fetchUsers(){
    this.testService.getUsers().subscribe((result:any)=>{
      this.todosList=result;
    })
  }

  takeActionForChild(){
   console.log("Take some action here");
  }

}
