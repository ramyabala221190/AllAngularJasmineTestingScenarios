import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularJasmineTesting';

  constructor(private router:Router,private location:Location){}

  ngOnInit(){
  }

  goBack(){
    this.location.back();
  }

  navigateToCounter(){
    this.router.navigate(['counter'])
  }

  navigateToTest(){
    this.router.navigate(['test'])
  }

  // public startCount:number=5;
  // public doesItRealyShow:boolean=false;

  // outputCount(data:any){
  //   console.log(data);
  // }


}
