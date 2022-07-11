import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularJasmineTesting';

  public startCount:number=5;
  public doesItRealyShow:boolean=false;

  outputCount(data:any){
    console.log(data);
  }

}
