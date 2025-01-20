import { ComponentFixture, TestBed, fakeAsync, flush, tick, waitForAsync } from '@angular/core/testing';

import { ChildComponent } from './child.component';
import { identifyElementByName } from '../spec-helpers/element.spec-helper';
import { TestService } from '../services/test.service';

describe('ChildComponent', () => {
  let component: ChildComponent;
  let fixture: ComponentFixture<ChildComponent>;
  let testServiceSpy:jasmine.SpyObj<TestService>;


  beforeEach(() => {

    const spy=jasmine.createSpyObj('TestService',['createAsyncTask','addMessageForUser','createAsyncTaskWithPromises']);
    TestBed.configureTestingModule({
      declarations: [ ChildComponent ],
      providers:[{provide:TestService,useValue:spy}]
    })

    fixture = TestBed.createComponent(ChildComponent);
    component = fixture.componentInstance;
    testServiceSpy=TestBed.inject(TestService) as jasmine.SpyObj<TestService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test button click',()=>{
    //arrange
    let button=identifyElementByName(fixture,'button');
    spyOn(component,'sendMessageToParent'); //spy on the method without calling the method

    //act
    button.triggerEventHandler('click',null);

    //assert
    expect(component.sendMessageToParent).toHaveBeenCalled();
  })

  it('test async task',fakeAsync(()=>{
    //act
   component.testAsyncTask();
   component.testAsyncPromiseTask();
  
  flush(); // or tick(300); to move ahead in time. wait for the time to end

  //assert now
  expect(testServiceSpy.createAsyncTask).toHaveBeenCalled();
  expect(testServiceSpy.createAsyncTaskWithPromises).toHaveBeenCalled();
  }))


  it('test async task created via promises',waitForAsync(()=>{
    //act
    component.testAsyncPromiseTask(); 

    //assert only after promise has resolved. fixture.whenStable() will resolve only when the promise resolves.
    fixture.whenStable().then(()=>{
      expect(testServiceSpy.createAsyncTaskWithPromises).toHaveBeenCalled();
    })
  }))
});
