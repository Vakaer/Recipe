import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";


@Directive({
    selector: '[appDropdown]'
  })
  export class DropdownDirective {
    constructor(private elRef: ElementRef) {}
    
    @HostBinding('class.show') isOpen = false;

    
     
    @HostListener('click') toggleOpen(event: Event) {
      debugger
      this.isOpen = true;
      
      
    }
}