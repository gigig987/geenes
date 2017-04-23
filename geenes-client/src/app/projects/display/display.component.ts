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
        WebFont.load({
    google: {
      families: ['Rubik Mono One']
    }
  });
        this.specimens.forEach((specimen,i) => {
          specimen.content = res[i];
            console.log(specimen.content);

//             var  str_Elemenr = `
//     <script>
//    WebFontConfig = {
//   google: {
//     families: ['Rubik Mono One']
//   }
//    };
// </script> 
//     `;
//     var nodeElement =   this.createDiv("div",str_Elemenr);
//     document.body.appendChild(nodeElement);
        });
       
      }, (error) => {
        console.log(error);
      })
  }



  ngOnInit(){
    
}


createDiv(node_name,textElement) {
          var _nodeElement = document.createElement(node_name);
          _nodeElement.innerHTML = textElement;
          return _nodeElement;
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
