import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestService } from '../services/test.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {

  constructor(private testService:TestService) { }

  @Input('user')user:any;
  @Output('action')action=new EventEmitter<string>();

  ngOnInit(): void {
  }

  sendMessageToParent(){
    console.log("method called");
    this.action.emit(this.user);
  }

  testAsyncTask(){
    setTimeout(()=>{
      this.testService.createAsyncTask();
    },250)
  }

  createPromise(){
    return new Promise((resolve,reject)=>{
      resolve(true);
    })
  }

  testAsyncPromiseTask(){
    this.createPromise().then(()=>{
      this.testService.createAsyncTaskWithPromises();
    })
  }

}
