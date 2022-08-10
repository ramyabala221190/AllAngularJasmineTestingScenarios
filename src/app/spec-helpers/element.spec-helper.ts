import { HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";


export function identifyElementByAttribute<T>(fixture:ComponentFixture<T>,attribute:string):DebugElement{
   return fixture.debugElement.query(By.css(`[data-testid="${attribute}"]`));
}

export function identifyElementByName<T>(fixture:ComponentFixture<T>,elementName:string):DebugElement{
  return fixture.debugElement.query(By.css(elementName));
}

export function triggerClickEventOnElement<T>(fixture:ComponentFixture<T>,selector:string){
  const debugElement=identifyElementByAttribute(fixture,selector);
  debugElement.triggerEventHandler('click',null);
}

export function assertTextContent<T>(fixture:ComponentFixture<T>,selector:string,expectedText:any){
  const debugElement=identifyElementByAttribute(fixture,selector);
  expect(debugElement.nativeElement.textContent).toBe(expectedText);
}

export function updateElementContent<T>(fixture:ComponentFixture<T>,selector:string,text:any){
  const debugElement=identifyElementByAttribute(fixture,selector);
  debugElement.nativeElement.value=text;
}

export function getRequestHelper(controller:HttpTestingController,url:string){
  return controller.expectOne(
    {
   url:url,
   method:"GET"
    }
  )
}

export function postRequestHelper(controller:HttpTestingController,url:string){
  return controller.expectOne(
    {
   url:url,
   method:"POST"
    }
  )

}
