import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { triggerClickEventOnElement, assertTextContent, identifyElementByAttribute, updateElementContent } from '../spec-helpers/element.spec-helper';
import { TestComponent } from '../test/test.component';

import { CounterComponent } from './counter.component';
import { TestService } from '../services/test.service';
import { of } from 'rxjs';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;
  let debugElement:DebugElement;
  let router:Router;
  let location:Location;
  let service:TestService;

  let routes:Routes=[{
    path:'test',
    component:TestComponent
  }]

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ CounterComponent ],
      imports:[FormsModule,RouterTestingModule.withRoutes(routes)],
      providers:[],
      schemas:[NO_ERRORS_SCHEMA]
    })
    fixture=TestBed.createComponent(CounterComponent);
    component=fixture.componentInstance;
    debugElement=fixture.debugElement;
    location=TestBed.get(Location);
    router=TestBed.get(Router);
    service=fixture.debugElement.injector.get(TestService)
    component.startCount=5;
    fixture.detectChanges();

  });

  // it('should create', () => {
  //   expect(component).toBeTruthy(); //smoke test
  // });

//   it('test navigation to test component',fakeAsync(()=>{
//     triggerClickEventOnElement(fixture,"test-button");
//     tick();
//     expect(location.path()).toEqual("/test");
//   }))

//   it('increment count',()=>{
//     //testing @Output properties
//     let sample=0;
//     component.outputCount.subscribe(x=>sample++);
//     //fire click event on the increment button;
//     triggerClickEventOnElement(fixture,"increment-button");

//    //manually trigger change detection because angular wont do that
//     fixture.detectChanges();

//     //assert if the count output element contains the correct text on clicking the button once
//     assertTextContent(fixture,"count",'6');
//     expect(sample).toBe(1);
//   })

//   it('decrement count',()=>{

//  //fire click event on the decrement button
//  triggerClickEventOnElement(fixture,'decrement-button');

//  //manually trigger change detection because angular wont do that
//  fixture.detectChanges();

//  //assert if the count output element contains the correct text on clicking the button once
//  assertTextContent(fixture,"count",'4');

//   })

//   it('test the input property startCount',()=>{
//     //check if the input provided by the AppComponent matches the count output element
// assertTextContent(fixture,'count',component.startCount.toString())
//   })

//   it('test the output property outputCount on increment',()=>{
//     /*
// We are checking if the value emitted by output property countOutput matches the count output element value.
//     */
//     let observedCount=0;
//     component.outputCount.subscribe(result=>{
//       observedCount=result;
//     })

//     //fire increment button
//     triggerClickEventOnElement(fixture,'increment-button');

//     //manually detect changes
//     fixture.detectChanges();

//     //verify if the observed count matches the expected value
//     assertTextContent(fixture,'count',observedCount.toString())
//   })

//   it('test the output property outputCount on decrement',()=>{
//     /*
// We are checking if the value emitted by output property countOutput matches the count output element value.
//     */
//     let observedCount=0;
//     component.outputCount.subscribe(result=>{
//       observedCount=result;
//     })

//     //fire decrement button
//     triggerClickEventOnElement(fixture,'decrement-button');

//     //manually detect changes
//     fixture.detectChanges();

//     //verify if the observed count matches the expected value
//     assertTextContent(fixture,'count',observedCount.toString())
//   })

//   it('test the output property outputCount on reset',()=>{
//     /*
// We are checking if the value emitted by output property countOutput matches the count output element value.
//     */
//     let observedCount=0;
//     component.outputCount.subscribe(result=>{
//       observedCount=result;
//       console.log("Observed count on reset",observedCount);
//     })

//     //identify the reset input element
//     const resetElement=identifyElementByAttribute(fixture,'reset-input');

//     //update the reset input element
//     updateElementContent(fixture,'reset-input',150);

//    //dispatch input event
//     resetElement.nativeElement.dispatchEvent(new Event('input'));

//     //fire reset button
//     triggerClickEventOnElement(fixture,'reset-button');

//     //manually detect changes
//     fixture.detectChanges();

//     //verify if the observed count matches the expected value
//     assertTextContent(fixture,'count',observedCount.toString())
//   })

//   it('reset count',()=>{
//  const newValue="100";  //if we pass string the this.count should remain unchanged i.e 0
//  const resetElement=identifyElementByAttribute(fixture,'reset-input');
//  //get the reset input element

//  //update the reset input element
//  updateElementContent(fixture,'reset-input',newValue);
//  /*
//  Angular forms cannot observe value changes directly. Instead, Angular listens for an input event
//  that the browser fires when a field value changes.
//  For compatibility with Template-driven and Reactive Forms, we need to dispatch a fake input event.
//  Such events are also called synthetic events.
//  */
//  resetElement.nativeElement.dispatchEvent(new Event('input'));

//  //fire click event on reset button
//  triggerClickEventOnElement(fixture,'reset-button');

//  //manually trigger change detection because angular wont do that
//  fixture.detectChanges();

//  //assert if the count output element contains the same value as this.count
//  assertTextContent(fixture,"count",component.startCount.toString());
//  })

//  it('test conditional elements',()=>{
//    spyOn(component,'visible');
//    component.doesShow=true;
//    component.doesItRealyShow=true;
//    fixture.detectChanges();
//    let elem=identifyElementByAttribute(fixture,'show-button');
//    elem.triggerEventHandler('click',null);
//    console.log(elem);
//    expect(elem).toBeTruthy();
//    expect(component.visible).toHaveBeenCalled();
//  })

//  //testing methods called from service
//  it('test getUserData',()=>{
//    //we are faking method call and also faking the method called from service using callFake
//    // If its not an api call, you could use returnValue after .and to hardcode the data
//    //to be returned from the service
//    let spy=spyOn(service,'getUsers').and.callFake(()=>{
//      return of({})
//    });
//    component.getUserData();
//    expect(spy).toHaveBeenCalled()
//  })

});

