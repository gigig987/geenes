import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';
import { Template } from '../template';
// import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {

  constructor(private templatesService : TemplatesService) { }

  ngOnInit() {
    this.templatesService.getAllTemplates().subscribe(t =>{ 
    this.templates = t;
    this.selectedTemplate = this.templates[0]; //!HARDCODED(0) to the first item in the templates collection
    // Maybe in the future this should be initialised to the last item selected by the user and cached.
  });

  }
  templates: Template[];
  templateContent:String = '';
  selectedTemplate:Template;
}

