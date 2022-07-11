import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  constructor(private service:TestService) { }


  ngOnInit(): void {
  }

  ngOnChanges(){

  }

  @Input('startCount') startCount:number=0;
  @Output('outputCount')outputCount=new EventEmitter<number>();
  @Input('doesItRealyShow')doesItRealyShow:boolean=false;
  public resetInput:number=0;
  public doesShow:boolean=false;

  increment(){
    this.startCount++;
    this.outputCount.emit(this.startCount);
  }

  decrement(){
    this.startCount--;
    this.outputCount.emit(this.startCount);
  }

  reset(){
    let regex=/\d+/
    if(this.resetInput.toString().match(regex)){
    this.startCount=this.resetInput;
    this.outputCount.emit(this.startCount);
    }
  }

  visible(){

  }

  getUserData(){
    this.service.getUsers().subscribe(
      data=>console.log(data),
      err=>console.log(err),
      ()=>console.log("completed. Received data")
    )
  }

}
