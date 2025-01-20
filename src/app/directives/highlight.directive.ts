import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @HostBinding('style.color')color:string="blue";

  constructor() { }

  @HostListener('mouseover',['$event'])
  onMouseOver(){
    this.color="yellow";
  }

}
