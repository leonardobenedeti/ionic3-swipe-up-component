import { Component, ElementRef, Renderer, Input } from '@angular/core';
import { DomController, Platform, Events } from 'ionic-angular';

@Component({
  selector: 'content-drawer',
  templateUrl: 'content-drawer.html'
})
export class ContentDrawer {

  @Input('options') options: any;

  handleHeight: number = 0;
  bounceBack: boolean = true;
  thresholdTop: number = 200;
  thresholdBottom: number = 200;
  handleTop: number = 30;

  details: any;

  constructor(
    public element: ElementRef, 
    public renderer: Renderer, 
    public domCtrl: DomController, 
    public platform: Platform,
    public events: Events
    ) {

      events.subscribe('open', (params)=>{
        this.details = params.dados;
        this.open();
      })
  }

  ngAfterViewInit() {

    if(this.options.handleHeight){
      this.handleHeight = this.options.handleHeight;
    }

    if(this.options.bounceBack){
      this.bounceBack = this.options.bounceBack;
    }

    if(this.options.thresholdFromBottom){
      this.thresholdBottom = this.options.thresholdFromBottom;
    }

    if(this.options.thresholdFromTop){
      this.thresholdTop = this.options.thresholdFromTop;
    }

    this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() - this.handleHeight + 'px');

    let hammer = new window['Hammer'](this.element.nativeElement);
    hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });

    hammer.on('pan', (ev) => {
      this.handlePan(ev);
    });

    hammer.on('tap', (ev)=>{
      this.open();
    });


  }

  handlePan(ev){
    let newTop = ev.center.y;

    let bounceToBottom = false;
    let bounceToTop = false;

    if(this.bounceBack && ev.isFinal){

      let topDiff = newTop - this.thresholdTop;
      let bottomDiff = (this.platform.height() - this.thresholdBottom) - newTop;      

      topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;

    }

    if((newTop < this.thresholdTop && ev.additionalEvent === "panup") || bounceToTop){
      this.open();
    } else if(((this.platform.height() - newTop) < this.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom){
      this.close();
    } else {

      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'none');

      if(newTop > 0 && newTop < (this.platform.height() - this.handleHeight)) {

        if(ev.additionalEvent === "panup" || ev.additionalEvent === "pandown"){

          this.domCtrl.write(() => {
            this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
          });

        }

      }

    }

  }

  open(){
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'top',  this.handleTop + 'px');
    });
  }

  close(){
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() - this.handleHeight + 'px');
    });
  }

}