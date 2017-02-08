import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

   // instantiate posts to an empty array
  projects: any = [];

  constructor(private projectsService : ProjectsService) { }

  ngOnInit() {
    this.projectsService.getAllProjects().subscribe(p =>{ 
      this.projects = p;
      })
  }

}
