import { Component, OnInit, ViewChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DisplayService } from './shared/display.service';
import { Design } from './shared/design.class';
import { Template } from './shared/template.class';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  providers: [DisplayService],
  // styles:[':host >>> div[data-index="1"] h1 {color:'+this.color+';}']
  // styleUrls: ['./display.component.css']
})



export class DisplayComponent implements OnInit {

  private sub: any;
  public design: Design;
  public generations: any;
  public specimens = [];
  public selectedTemplate: Template;

  @ViewChildren('styledSpecimen') divs: QueryList<ElementRef>;;

  constructor(
    private route: ActivatedRoute,
    private displayService: DisplayService,
    private renderer: Renderer
  ) {     //CALL to Api generations

  }

  private getGeneration(gId) {
    this.displayService.getGenerationByID(gId)
      .subscribe((result) => {
        this.specimens = result.specimens;
        let genesArray = [];
        this.specimens.forEach(specimen => {
          genesArray.push(specimen.dna.genes);
        });
        console.log(genesArray);
        this.getStyle(genesArray);
      });
  }
  private getStyle(genesArray) {
    this.displayService.getStyleByTemplateString('<h1>ciao</h1><p>dasdsa</p>', genesArray) //this.selectedTemplate.content
      .subscribe((res) => {
        console.log(res);
      }, (error) => {
        console.log(error);
      })
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let gId = params['g_id'];
      let pId = params['p_id'];
      this.getGeneration(gId);

      
    });
  }



  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

    onSelectTemplate(template: Template): void {
      this.selectedTemplate = template;

      //this.displayService.getGenerationsByProjectID(this.pId).subscribe(result => { this.generations = result; console.log(this.generations) })

      //test assignement of style to HTML markup tags
      let elements: Array<any>;
      elements = this.divs.toArray()[0].nativeElement.children;
      Array.from(elements).forEach(element => {
          console.log(element.nodeName);
      }); //end foreach
    }

}
