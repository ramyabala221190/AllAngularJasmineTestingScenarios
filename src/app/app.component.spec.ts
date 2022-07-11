import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { assertTextContent, identifyElementByName } from './spec-helpers/element.spec-helper';

describe('AppComponent', () => {
  let fixture:ComponentFixture<AppComponent>;
  let debugElement:DebugElement;
  let component:AppComponent;
  beforeEach(async () => {
   console.log("Executes before each spec is run");
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent
      ],
    })

    TestBed.compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    debugElement=fixture.debugElement;
    component=fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(()=>{
    console.log("executes after each spec is run");
  })

beforeAll(()=>{
console.log("executes before all specs are run");
})

afterAll(()=>{
console.log("executes after all specs are run");
})

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

  it('test the presence of child component Counter',()=>{
   let counterComponentElement=identifyElementByName(fixture,'app-counter');
   expect(counterComponentElement).toBeTruthy();
  })

  it('test whether the correct value is being passed to the @input startCount',()=>{
    let counterComponentElement=identifyElementByName(fixture,'app-counter');
   expect(counterComponentElement.properties["startCount"]).toBe(component.startCount);

  })

  it('test whether the correct value is received from @output outputCount',()=>{
    /*
 we trigger the outputCount property to emit a value and then check if the handler in AppComponent
 has been called with an argument that matches the value emitted by outputCount
    */
    spyOn(component,'outputCount'); //component is the object and outputCount is the method on that object
    /*
This installs a spy on the outputCount method. Under the hood, Jasmine saves the original
function for later and overwrites the function with a spy. Once the spec is completed,
Jasmine automatically restores the original function.
    */
    let counterComponentElement=identifyElementByName(fixture,'app-counter');
    counterComponentElement.triggerEventHandler('outputCount',10);
    expect(component.outputCount).toHaveBeenCalledWith(10);
  })


});

