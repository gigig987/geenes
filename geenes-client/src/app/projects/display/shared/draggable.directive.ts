import { Directive, ElementRef, Renderer, OnDestroy, OnInit, AfterViewInit, Input } from '@angular/core';


@Directive({
  selector: '[draggable]',
  host: {
    '(dragstart)': 'onDragStart($event)',
    '(dragend)': 'onDragEnd($event)',
    '(drag)': 'onDrag($event)'
  }
})
export class DraggableDirective implements OnDestroy, OnInit, AfterViewInit {
  private Δx: number = 0;
  private Δy: number = 0;
  
  private canDrag:boolean = true;
  
  @Input('draggable')
  set draggable(val:any){
    if(val === undefined || val === null || val === '' ) return;
    this.canDrag = !!val;
  }
  private mustBePosition: Array<string> = ['absolute', 'fixed', 'relative'];
  constructor(
    private el: ElementRef, private renderer: Renderer
  ) {
    
  }
  
  ngOnInit(): void {
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'true');
  }
  ngAfterViewInit(){
    try {
      let position = window.getComputedStyle(this.el.nativeElement).position;
      if (this.mustBePosition.indexOf(position) === -1) {
        console.warn( this.el.nativeElement, 'Must be having position attribute set to ' + this.mustBePosition.join('|'));
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  ngOnDestroy(): void {
    this.renderer.setElementAttribute(this.el.nativeElement, 'draggable', 'false');
  }
  
  onDragStart(event: MouseEvent) {
    this.Δx = event.x - this.el.nativeElement.offsetWidth;
    this.Δy = event.y - this.el.nativeElement.offsetHeight;

      //     var offset = self.selectedRatingElement.offsetWidth / 2 - self.handleDragOffset;
      // var xPos = e.clientX - self.containerElement.getBoundingClientRect().left;
      // self.setSliderPosition(xPos - self.selectedRatingElement.offsetWidth / 2 + offset);
  }

  onDrag(event: MouseEvent) {
    this.doTranslation(event.x, event.y);
  }

  onDragEnd(event: MouseEvent) {
    this.Δx = 0;
    this.Δy = 0;
  }

  doTranslation(x: number, y: number) {
    if (!x || !y) return;
    // this.renderer.setElementStyle(this.el.nativeElement, 'top', (y - this.Δy) + 'px');
    this.renderer.setElementStyle(this.el.nativeElement, 'transform', 'translateY('+ ((y - this.Δy) / this.el.nativeElement.offsetHeight * 100) + '%)');
    // self.selectedRatingElement.style.transform = "translateX(" + (self.sliderPosition / self.selectedRatingElement.offsetWidth * 100) + "%)";
  }
  

}