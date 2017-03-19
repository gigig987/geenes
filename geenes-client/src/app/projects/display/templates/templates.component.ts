import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TemplatesService } from '../shared/templates.service';
import { Template } from '../shared/template.class';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  @Output() selectTemplate: EventEmitter<Template> = new EventEmitter<Template>();

  constructor(private templatesService : TemplatesService) { }

  ngOnInit() {
    this.templatesService.getAllTemplates().subscribe(t =>{ 
    this.templates = t;
    this.selectedTemplate = this.templates[0];
    this.selectTemplate.emit(this.selectedTemplate);
     //!HARDCODED(0) to the first item in the templates collection
    // Maybe in the future this should be initialised to the last item selected by the user and cached.
  });

}

onChange(template:Template){
   this.selectTemplate.emit(template);
}

  templates: Template[];
  public selectedTemplate:Template;
}

