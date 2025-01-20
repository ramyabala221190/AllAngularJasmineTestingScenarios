
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestService } from '../services/test.service';
import { TestComponent } from './test.component';
import { of } from 'rxjs';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { identifyElementByClassName, identifyElementByComponentName, identifyElementByName } from '../spec-helpers/element.spec-helper';
import { ChildComponent } from '../child/child.component';
import { By } from '@angular/platform-browser';

/**
 * 'app-child' is not a known element.
 * To avoid this error, we set schemas:[NO_ERRORS_SCHEMA] in the testing module.
 * But the issue with this is that it will mask any other issues in the component template as well.
 * To prevent this, we will mock any child components or directives as below and add it to the declarations
 * 
 */

describe('TestComponent', () => {
  let componentFixture: ComponentFixture<TestComponent>;
  let component:TestComponent;
  let todos:any[];
  let testServiceSpy:jasmine.SpyObj<TestService>;

  @Component({
    selector: 'app-child',
    template: '<div></div>',
  })
  class MockChildComponent{}

  beforeEach(() => {
   const spy=jasmine.createSpyObj('TestService',['getUsers']);
   TestBed.configureTestingModule({
    //declarations:[TestComponent,MockChildComponent], //this is required for shallow integration tests
    declarations:[TestComponent,ChildComponent], //instead of the mock component, use the actual component for deep integration tests
   // schemas:[NO_ERRORS_SCHEMA], //this is needed to ensure that no child components or directives are checked. But not recommended. Instead go for creating mock components or directives
    providers:[{provide:TestService,useValue:spy}]
   })
   
    todos=[
      {
        "userId": 1,
        "id": 1,
        "title": "delectus aut autem",
        "completed": false
      },
      {
        "userId": 1,
        "id": 2,
        "title": "quis ut nam facilis et officia qui",
        "completed": false
      }
     ]
  componentFixture=TestBed.createComponent(TestComponent);
  component=componentFixture.componentInstance; //use the fixture to access the component instance
  testServiceSpy=TestBed.inject(TestService) as jasmine.SpyObj<TestService>;  
  testServiceSpy.getUsers.and.returnValue(of(todos)); //arrange
  componentFixture.detectChanges();  //run change detection


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //interaction tests with TestService

  it('check the no of todos fetched',()=>{   
    //act
    component.fetchUsers();

    //assert
    expect(component.todosList.length).toEqual(todos.length)
  })


  it('should call getUsers',()=>{
    //act
    component.fetchUsers();
    
    //assert
    //interation testing to check if a class is able to call a method of another class
    expect(testServiceSpy.getUsers).toHaveBeenCalled();
  })

  // shallow integration tests require a mock child component

  it('check content of .heading1',()=>{
    expect(identifyElementByClassName(componentFixture,'h4','heading1').nativeElement.textContent).toBe(component.heading1)
  })

  it('check content of .heading2',()=>{
    expect(identifyElementByClassName(componentFixture,'h4','heading2').nativeElement.textContent).toBe(component.heading2)
  })

  it('check the no of <div> elements created for each user',()=>{
    //act
   component.fetchUsers();
   componentFixture.detectChanges(); //this is required so that change made to usersList property inside the subscribe block is detected
   
   //assert
   console.log(identifyElementByClassName(componentFixture,'ul','user-container').children.length)
   expect(identifyElementByClassName(componentFixture,'ul','user-container').children.length).toBe(todos.length);
  })


  //deep integration tests that tests the interaction between the test and child component requires the removal of Mock Child component
  //and declaring the actual child component

  it('test for child component',()=>{
    //act
    component.fetchUsers();
    componentFixture.detectChanges();

    //assert
    const debugElementList=identifyElementByComponentName(componentFixture,ChildComponent);
    expect(debugElementList.length).toBe(todos.length);
    expect(debugElementList[0].componentInstance.user.id).toBe(todos[0].id); // checking for the @Input property value of child component
  })


  it('test Action button in Child Component',()=>{
     //arrange
     spyOn(componentFixture.componentInstance,'takeActionForChild'); //spy on the method you are expecting to be called
     component.fetchUsers();
     componentFixture.detectChanges();

     const debugElements=identifyElementByComponentName(componentFixture,ChildComponent);

     //act
    // debugElements[0].query(By.css('button')).triggerEventHandler('click',{stopPropagation:()=>{}}); //trigger click on the Action button in ChildComponent

     //alternative way to trigger click is to directly call the emit() on the EventEmitter in ChildComponent
    (<ChildComponent>debugElements[0].componentInstance).action.emit();

    //assert
    expect(componentFixture.componentInstance.takeActionForChild).toHaveBeenCalled(); //check if the @Output is triggering takeActionForChild in TestComponent

  })

  it('test Add button in TestComponent',()=>{
      //arrange
      component.fetchUsers();
      componentFixture.detectChanges();

      let inputElement=identifyElementByName(componentFixture,'input');
      inputElement.nativeElement.value="Groceries";
      //act
      identifyElementByName(componentFixture,'button').triggerEventHandler('click',null);
      componentFixture.detectChanges(); //because the button click changes the value of the todosList property

      //assert
      const debugElements=identifyElementByComponentName(componentFixture,ChildComponent);
      expect(debugElements.length).toBe(todos.length);

  })


});
