import { Component, OnInit } from '@angular/core';
import { TemplatesService } from '../templates.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
  templates= [];

  constructor(private templatesService : TemplatesService) { }


  ngOnInit() {
    this.templatesService.getAllTemplates().subscribe(t =>{ 
    this.templates = t;
    console.log(this.templates);
    });
  }

}
