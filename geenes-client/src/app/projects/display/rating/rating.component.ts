import {
  Component,
  OnInit,
  ViewChild,
  ViewChildren,
  HostListener,
  QueryList,
  ElementRef,
  Renderer,
  ChangeDetectorRef,
  Input,
  OnDestroy,
  AfterViewInit
} from '@angular/core';
import { SafeHtmlPipe } from '../../../shared/safeHTML.pipe';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnDestroy, OnInit, AfterViewInit {
  @Input() id:string;

  @ViewChild('rCtrl') rCtrl: ElementRef;
  @ViewChild('sRatingE') sRatingE: ElementRef;
  @ViewChild('svgContainer') svgContainer: ElementRef;
  @ViewChildren('ratingOpt') ratingOpt: QueryList<ElementRef>;


  private dragging = false;
  public selectedRating: number = 0;
  private sliderPosition: number = 0;
  private handleDragOffset: number = 0;
  private facePaths: Array<any> = [];
  private onRatingChange = function (rating) { };
  public faceSVGContainer: String = '<svg></svg>'//'<svg width="55px" height="55px" viewBox="0 0 50 50"><path d="M50,25 C50,38.807 38.807,50 25,50 C11.193,50 0,38.807 0,25 C0,11.193 11.193,0 25,0 C38.807,0 50,11.193 50,25" class="base" fill="rgba(255,169,141,1)"></path><path d="M25,31.5 C21.3114356,31.5 17.7570324,32.4539319 14.6192568,34.2413572 C13.6622326,34.7865234 13.3246514,36.0093483 13.871382,36.9691187 C14.4181126,37.9288892 15.6393731,38.2637242 16.5991436,37.7169936 C19.1375516,36.2709964 22.0103269,35.5 25,35.5 C27.9896731,35.5 30.8610304,36.2701886 33.4008564,37.7169936 C34.3606269,38.2637242 35.5818874,37.9288892 36.128618,36.9691187 C36.6753486,36.0093483 36.3405137,34.7880878 35.3807432,34.2413572 C32.2429676,32.4539319 28.6885644,31.5 25,31.5 Z" class="mouth" fill="#655F52"></path><path d="M30.6486386,16.8148522 C31.1715727,16.7269287 31.2642212,16.6984863 31.7852173,16.6140137 C32.3062134,16.529541 33.6674194,16.3378906 34.5824585,16.1715729 C35.4974976,16.0052551 35.7145386,15.9660737 36.4964248,15.8741891 C36.6111841,15.9660737 36.7220558,16.0652016 36.8284271,16.1715729 C37.7752853,17.118431 38.1482096,18.4218859 37.9472002,19.6496386 C37.8165905,20.4473941 37.4436661,21.2131881 36.8284271,21.8284271 C35.26633,23.3905243 32.73367,23.3905243 31.1715729,21.8284271 C29.8093655,20.4662198 29.6350541,18.3659485 30.6486386,16.8148522 Z" class="right-eye" fill="#655F52"></path><path d="M18.8284271,21.8284271 C20.1906345,20.4662198 20.3649459,18.3659485 19.3513614,16.8148522 C18.8284273,16.7269287 18.7357788,16.6984863 18.2147827,16.6140137 C17.6937866,16.529541 16.3325806,16.3378906 15.4175415,16.1715729 C14.5025024,16.0052551 14.2854614,15.9660737 13.5035752,15.8741891 C13.3888159,15.9660737 13.2779442,16.0652016 13.1715729,16.1715729 C12.2247147,17.118431 11.8517904,18.4218859 12.0527998,19.6496386 C12.1834095,20.4473941 12.5563339,21.2131881 13.1715729,21.8284271 C14.73367,23.3905243 17.26633,23.3905243 18.8284271,21.8284271 Z" class="left-eye" fill="#655F52"></path></svg>';
  private easings: any = {
    easeInOutCubic: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
      return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInOutQuad: function (t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * ((--t) * (t - 2) - 1) + b;
    },
    linear: function (t, b, c, d) {
      return c * t / d + b;
    }
  };


  private mouseDown: boolean = false;
  private canDrag: boolean = true;


  set draggable(val: any) {
    if (val === undefined || val === null || val === '') return;
    this.canDrag = !!val;
  }
  private mustBePosition: Array<string> = ['absolute', 'fixed', 'relative'];
  constructor(
    private el: ElementRef, private renderer: Renderer, private cdr: ChangeDetectorRef
  ) {

  }

  ngOnInit(): void {
    this.renderer.setElementAttribute(this.sRatingE.nativeElement, 'draggable', 'true');
    console.log(this.id);
  }
  ngAfterViewInit() {
    try {
      let position = window.getComputedStyle(this.sRatingE.nativeElement).position;
      if (this.mustBePosition.indexOf(position) === -1) {
        console.warn(this.el.nativeElement, 'Must be having position attribute set to ' + this.mustBePosition.join('|'));
      }
    } catch (ex) {
      console.error(ex);
    }

    this.ratingOpt.forEach((element) => {

      // Copy face path data from HTML
      let paths = {};
      [].forEach.call(element.nativeElement.querySelectorAll("path:not(.base)"), (path) => {
        let pathStr = path.getAttribute("d");
        paths[path.getAttribute("class")] = this.splitString(pathStr);
      });
      this.facePaths.push(paths);
      // On rating selected
      // element.container.addEventListener("ontouchend" in document ? "touchend" : "click", function(e) {
      //   if ("ontouchend" in document) {
      //     let ratingTouchCurrentPosition = {x: e.pageX, y: e.pageY};
      //     let dragDistance = Math.sqrt(Math.pow(ratingTouchCurrentPosition.x - self.ratingTouchStartPosition.x, 2) + Math.pow(ratingTouchCurrentPosition.y - self.ratingTouchStartPosition.y, 2));
      //     if (dragDistance > 10) {
      //       return;
      //     }
      //   }
      //let newRating = element.nativeElement.getAttribute("rating") - 1;
      // this.setRating(newRating, {fireChange: false});
    });


    this.setRating(2, { duration: 0 });
  }
  ngOnDestroy(): void {
    this.renderer.setElementAttribute(this.sRatingE.nativeElement, 'draggable', 'false');
  }

  splitString(value) {
    var re = /-?\d*\.?\d+/g;
    var toStr = function toStr(val) {
      return typeof val == "string" ? val : String(val);
    };
    return {
      digits: toStr(value).match(re).map(Number),
      nondigits: toStr(value).split(re)
    };
  }

  recomposeString(digits, nondigits) {
    return nondigits.reduce(function (a, b, i) {
      return a + digits[i - 1] + b;
    });
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    if (this.dragging) {
      this.onHandleRelease(event);
    }
  }
  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    if (event.target == this.sRatingE.nativeElement) {
      event.preventDefault();
      this.dragging = true;
      this.handleDragOffset = event.offsetY;
      // self.setLabelTransitionEnabled(false);
      // document.body.classList.add("dragging");
      // document.body.addEventListener("mousemove", self.onHandleDrag);
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.dragging) {
      this.onHandleDrag(event);
    }
  }
  onHandleDrag(event: MouseEvent) {
    event.preventDefault();

    let offset = this.sRatingE.nativeElement.offsetHeight / 2 - this.handleDragOffset;
    let yPos = event.clientY - this.rCtrl.nativeElement.getBoundingClientRect().top;
    this.setSliderPosition(yPos - this.sRatingE.nativeElement.offsetHeight / 2 + offset);

  }

  onHandleRelease(event: MouseEvent) {
    this.dragging = false;
    // self.setLabelTransitionEnabled(true);
    let rating = Math.round(this.sliderPosition / this.rCtrl.nativeElement.offsetHeight * this.ratingOpt.length);
    this.setRating(rating, { duration: 200, fireChange: true });
  }

  setRating(rating: number, options) {
    // let self = this;
    var options = options || {};
    let startTime;
    let fireChange = options.fireChange || false;
    let onComplete = options.onComplete || function () { };
    let easing = options.easing || this.easings.easeInOutCubic;
    let duration = options.duration == undefined ? 550 : options.duration;
    let startYPosition = this.sliderPosition;
    let endYPosition = rating * this.sRatingE.nativeElement.offsetHeight;

    if (duration > 0) {
      let anim = (timestamp) => {
        startTime = startTime || timestamp;
        let elapsed = timestamp - startTime;
        let progress = easing(elapsed, startYPosition, endYPosition - startYPosition, duration);

        this.setSliderPosition(progress);

        if (elapsed < duration) {
          requestAnimationFrame(anim);
        } else {
          this.setSliderPosition(endYPosition);
          // self.setLabelTransitionEnabled(true);
          if (this.onRatingChange && this.selectedRating != rating && fireChange) {
            this.onRatingChange(rating);
          }
          onComplete();
          this.selectedRating = rating;
          this.cdr.detectChanges();

        }
      };

      // self.setLabelTransitionEnabled(false);
      requestAnimationFrame(anim);
    } else {
      this.setSliderPosition(endYPosition);
      if (this.onRatingChange && this.selectedRating != rating && fireChange) {
        this.onRatingChange(rating);
      }
      onComplete();
      this.selectedRating = rating;
      this.cdr.detectChanges();
    }
  }

  setSliderPosition(position: any) {
    // let self = this;
    this.sliderPosition = Math.min(Math.max(0, position), this.rCtrl.nativeElement.offsetHeight - this.sRatingE.nativeElement.offsetHeight);
    let stepProgress = this.sliderPosition / this.rCtrl.nativeElement.offsetHeight * this.ratingOpt.length;
    let relativeStepProgress = stepProgress - Math.floor(stepProgress);
    let currentStep = Math.round(stepProgress);
    let startStep = Math.floor(stepProgress);
    let endStep = Math.ceil(stepProgress);
    // Move handle
    this.renderer.setElementStyle(this.sRatingE.nativeElement, 'transform', 'translateY(' + (this.sliderPosition / this.sRatingE.nativeElement.offsetHeight * 100) + '%)');
    // Set face
    let startPaths = this.facePaths[startStep];
    let endPaths = this.facePaths[endStep];
    let interpolatedPaths = {};
    for (let featurePath in startPaths) {
      if (startPaths.hasOwnProperty(featurePath)) {
        let startPath = startPaths[featurePath];
        let endPath = endPaths[featurePath];
        let interpolatedPoints = this.interpolatedArray(startPath.digits, endPath.digits, relativeStepProgress);
        let interpolatedPath = this.recomposeString(interpolatedPoints, startPath.nondigits);
        interpolatedPaths[featurePath] = interpolatedPath;
      }
    }
    this.faceSVGContainer = '<svg width="48" height="48" viewBox="0 0 48 48"><g id="base" class="base"><path d="M24,45 C35.5979797,45 45,35.5979797 45,24 C45,12.4020203 35.5979797,3 24,3 C12.4020203,3 3,12.4020203 3,24 C3,35.5979797 12.4020203,45 24,45 Z M24,48 C10.745166,48 0,37.254834 0,24 C0,10.745166 10.745166,0 24,0 C37.254834,0 48,10.745166 48,24 C48,37.254834 37.254834,48 24,48 Z" id="stroke" fill="#4990E2"></path><path d="M24,45 C35.5979797,45 45,35.5979797 45,24 C45,12.4020203 35.5979797,3 24,3 C12.4020203,3 3,12.4020203 3,24 C3,35.5979797 12.4020203,45 24,45 Z" id="fill" fill="#FFFFFF"></path></g><path d="' + interpolatedPaths["eyeL"] + '" id="eyeL" class="eyeL" fill="#0F56C0"></path><path d="' + interpolatedPaths["eyeR"] + '" id="eyeR" class="eyeR" fill="#0F56C0"></path><path d="' + interpolatedPaths["mouth"] + '" id="mouth" class="mouth" fill="#0F56C0"></path></svg>'
    // let interpolatedFill = this.interpolatedColor(self.ratingElements[startStep]["selectedFill"], self.ratingElements[endStep]["selectedFill"], relativeStepProgress);
    // self.selectedRatingSVGContainer.innerHTML = '<svg width="55px" height="55px" viewBox="0 0 50 50"><path d="M50,25 C50,38.807 38.807,50 25,50 C11.193,50 0,38.807 0,25 C0,11.193 11.193,0 25,0 C38.807,0 50,11.193 50,25" class="base" fill="' + interpolatedFill + '"></path><path d="' + interpolatedPaths["mouth"] + '" class="mouth" fill="#655F52"></path><path d="' + interpolatedPaths["right-eye"] + '" class="right-eye" fill="#655F52"></path><path d="' + interpolatedPaths["left-eye"] + '" class="left-eye" fill="#655F52"></path></svg>';
    //   // Update marker icon/label
    //   self.ratingElements.forEach(function(element, index) {
    //     let adjustedProgress = 1;
    //     if (index == currentStep) {
    //       adjustedProgress = 1 - Math.abs((stepProgress - Math.floor(stepProgress) - 0.5) * 2);
    //     }
    //     element.icon.style.transform = "scale(" + adjustedProgress + ")";
    //     element.label.style.transform = "translateY(" + self.interpolatedValue(9, 0, adjustedProgress) + "px)";
    //     element.label.style.color = self.interpolatedColor(self.labelSelectedColor, self.labelColor, adjustedProgress);
    //   });
    // },
  }
  interpolatedValue(startValue, endValue, progress) {
    return (endValue - startValue) * progress + startValue;
  }

  interpolatedArray(startArray, endArray, progress) {
    return startArray.map(function (startValue, index) {
      return (endArray[index] - startValue) * progress + startValue;
    });
  }


}
