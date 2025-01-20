import { Component, DebugElement, Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CounterComponent } from './counter/counter.component';
import { TestComponent } from './test/test.component';

@Directive({
selector:'[routerLink]'
})

export class RouterLinkDirectiveStub{

  @Input('routerLink')linkParams:any;
  navigatedTo:any=null;

  @HostListener('click',['$event'])
  onClick(){
    console.log("clicking here",this.navigatedTo);
    this.navigatedTo=this.linkParams;
  }

}

describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;
  let component:AppComponent;
  let locationSpy:jasmine.SpyObj<Location>;
  let routerSpy:jasmine.SpyObj<Router>;
  let activatedRouteMock={
    snapshot:{
      url:"counter"
    }
  }

  //mocking child component
  // @Component({
  //   selector: 'app-counter',
  //   template: `<div></div>`,
  // })
  // class MockCounterComponent {
  //   @Input('startCount') startCount:number=0;
  //   @Output('outputCount')outputCount=new EventEmitter<number>();
  // }

  
  beforeEach(() => {
   console.log("Executes before each spec is run");
   locationSpy= jasmine.createSpyObj('Location',['back']);
    TestBed.configureTestingModule({
      imports: [
       RouterTestingModule.withRoutes([
        {
          path:'counter',
          component:CounterComponent
        },
        {
          path:'test',
          component:TestComponent
        }
       ])
      ],
      //schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub
       // CounterComponent
       // MockCounterComponent
      ],
      providers:[
        {
          provide:Location,useValue:locationSpy,
        },
        {
          provide:ActivatedRoute,useValue:activatedRouteMock
        }
      ]
    })

    fixture = TestBed.createComponent(AppComponent);
    component=fixture.componentInstance;
    fixture.detectChanges();
  });

  
  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    /*
This  spec scts as a smoke test. It checks the presence of a Component instance.
It does not assert anything specific about the Component behavior yet. It merely proves that the
Component renders without errors.
If the smoke test fails, you know that something is wrong with the testing setup.

    */
  });

  it('test routerLink navigation',()=>{
    //arrange
     const linkA=fixture.debugElement.queryAll(By.css('a'))[0];
     const linkB=fixture.debugElement.queryAll(By.css('a'))[1]
     const routerLinkDirectiveA=fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub))[0].injector.get(RouterLinkDirectiveStub)
     const routerLinkDirectiveB=fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub))[1].injector.get(RouterLinkDirectiveStub)
     
     //act
     linkA.triggerEventHandler('click',null);
     linkB.triggerEventHandler('click',null);

     //assert
     expect(routerLinkDirectiveA.navigatedTo).toContain('counter');
     expect(routerLinkDirectiveB.navigatedTo).toContain('test');
     
  })


//   it('test the presence of child component Counter',()=>{
//    let counterComponentElement=identifyElementByName(fixture,'app-counter');
//    expect(counterComponentElement).toBeTruthy();
//   })

//   it('test whether the correct value is being passed to the @input startCount',()=>{
//     let counterComponentElement=identifyElementByName(fixture,'app-counter');
//    expect(counterComponentElement.properties["startCount"]).toBe(component.startCount);

//   })

//   it('test whether the correct value is received from @output outputCount',()=>{
//     /*
//  we trigger the outputCount property to emit a value and then check if the handler in AppComponent
//  has been called with an argument that matches the value emitted by outputCount
//     */
//     spyOn(component,'outputCount'); //component is the object and outputCount is the method on that object
//     /*
// This installs a spy on the outputCount method. Under the hood, Jasmine saves the original
// function for later and overwrites the function with a spy. Once the spec is completed,
// Jasmine automatically restores the original function.
//     */
//     let counterComponentElement=identifyElementByName(fixture,'app-counter');
//    // let element=counterComponentElement.queryAll(By.css('button'));
//     //console.log(element)
//    // element[0].triggerEventHandler('click',null);
//    // counterComponentElement.triggerEventHandler('outputCount',10);
//     //expect(component.outputCount).toHaveBeenCalled();
//   })


});

