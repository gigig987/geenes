import { Component, OnInit, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayService } from './shared/display.service';
import { Design } from './shared/design.class';
import { Template } from './shared/template.class';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  // styles:[':host >>> div[data-index="1"] h1 {color:'+this.color+';}']
  // styleUrls: ['./display.component.css']
})



export class DisplayComponent implements OnInit {


  public design: Design;
  public specimens = [];
  public selectedTemplate: Template;

  @ViewChildren('styledSpecimen') divs: QueryList<ElementRef>;;

  constructor(
    private route: ActivatedRoute,
    private displayService: DisplayService,
    private renderer: Renderer
  ) { }

  ngOnInit() {

          //CALL to Api generations
      this.route.params.subscribe((params: { id: string }) => {
        this.displayService.getGenerationByID(params.id)
          .subscribe((result) => {
            this.specimens = result.specimens;
            console.log(this.specimens)
          },
          error => {
            console.log(error);
          });
      });
  }


  onSelectTemplate(template: Template): void {
    this.selectedTemplate = template;
    //test assignement of style to HTML markup tags


    let elements: Array<any>;
    elements = this.divs.toArray()[0].nativeElement.children;
    Array.from(elements).forEach(element => {
        console.log(element.nodeName);
    }); //end foreach
  }

}
