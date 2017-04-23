import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { DisplayService } from './shared/display.service';
import { Design } from './shared/design.class';
import { Template } from './shared/template.class';
import { Observable } from 'rxjs/Observable';
var WebFont = require('webfontloader');





@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  providers: [DisplayService],
  // styles:[':host >>> div[data-index="1"] h1 {color:'+this.color+';}']
  styleUrls: ['./display.component.css']
})



export class DisplayComponent implements OnInit {

  private sub: any;
  public design: Design;
  public generations: any;
  public specimens = [];
  public fonts: Array<string>;
  public selectedTemplate: Template;
  private gId;


  constructor(
    private route: ActivatedRoute,
    private displayService: DisplayService,
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
    this.displayService.getStyleByTemplateStringToHtml(this.selectedTemplate.content, genesArray) //this.selectedTemplate.content
      .subscribe((res) => {
        this.fonts = [];
        this.specimens.forEach((specimen, i) => {
          specimen.content = res[i].html;
          this.fonts.push(res[i].fonts);
         
          
        });
        console.log(this.fonts);
         var flattened = this.fonts.reduce(function (a, b) {
            return a.concat(b);
          });
          console.log(flattened);
        WebFont.load({
          google: {
            families: flattened
          }
        });

      }, (error) => {
        console.log(error);
      })
  }



  ngOnInit() {

  }


  ngOnDestroy() {
    // Clean sub to avoid memory leak
    this.sub.unsubscribe();
  }

  onSelectTemplate(template: Template): void {
    this.selectedTemplate = template;
    this.sub = this.route.params.subscribe(params => {
      let gId = params['g_id'];
      let pId = params['p_id'];
      this.getGeneration(gId);
    });

  }

}
