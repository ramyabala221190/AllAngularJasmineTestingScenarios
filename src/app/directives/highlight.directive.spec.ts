import { Component } from '@angular/core';
import { HighlightDirective } from './highlight.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { identifyElementByName } from '../spec-helpers/element.spec-helper';
import { By } from '@angular/platform-browser';

describe('HighlightDirective', () => {

  //below is the mock component on which te directive is applied
  @Component({
    template:
    `<h4 appHighlight></h4>
    `
  })

  class TestDirectiveComponent{}
   let directive:HighlightDirective;
  let fixture:ComponentFixture<TestDirectiveComponent>;
  let component:TestDirectiveComponent;

  beforeEach(()=>{

    TestBed.configureTestingModule({
      declarations:[TestDirectiveComponent,HighlightDirective]
    })
    fixture=TestBed.createComponent(TestDirectiveComponent);
    component=fixture.componentInstance;
    //Use queryAll incase multiple elements in the components use the directive
    directive=fixture.debugElement.query(By.directive(HighlightDirective)).injector.get(HighlightDirective);
    fixture.detectChanges();    
  })

  it('default color of the text',()=>{
    //arrange
    const h4Element=identifyElementByName(fixture,'h4');

    //assert
    expect(h4Element.nativeElement.style.color).toBe(directive.color)
  })

  it('expect the color to change on mouseover',()=>{
    //arrange
    const h4Element=identifyElementByName(fixture,'h4');

    //act
    h4Element.triggerEventHandler("mouseover",null);
    fixture.detectChanges();

    //assert
    expect(h4Element.nativeElement.style.color).toBe(directive.color)

  })
});
