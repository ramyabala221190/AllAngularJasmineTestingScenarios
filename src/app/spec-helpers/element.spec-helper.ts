 import { HttpTestingController, TestRequest } from "@angular/common/http/testing";
import { Component, DebugElement, Type } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";


export function identifyElementByAttribute<T>(fixture:ComponentFixture<T>,attribute:string):DebugElement{
   return fixture.debugElement.query(By.css(`[data-testid="${attribute}"]`));
}

export function identifyElementByComponentName<T>(fixture:ComponentFixture<T>,component: Type<any>):DebugElement[]{
  return fixture.debugElement.queryAll(By.directive(component))
}

export function identifyElementByName<T>(fixture:ComponentFixture<T>,elementName:string):DebugElement{
  return fixture.debugElement.query(By.css(elementName));
}

export function identifyElementByClassName<T>(fixture:ComponentFixture<T>,elementName:string,elementClass:string):DebugElement{
  return fixture.debugElement.query(By.css(`${elementName}.${elementClass}`));
}

export function identifyElementByID<T>(fixture:ComponentFixture<T>,elementName:string,elementID:string):DebugElement{
  return fixture.debugElement.query(By.css(`${elementName}#${elementID}`));
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


