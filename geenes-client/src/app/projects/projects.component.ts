import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Projects } from './shared/projects.interface';
import { ProjectsService } from './shared/projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
// instantiate projects to an empty array
  projects: any = [];
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public _projectGenerations: number;
  public selected: boolean;
  public prevSelected: boolean;

  constructor(private projectsService : ProjectsService, private _fb: FormBuilder, private router:Router) { }

  ngOnInit() {
    this.refreshList();
        // form
    this.myForm = this._fb.group({
            name: ['', [<any>Validators.required, <any>Validators.minLength(3)]],
        });
  }

  refreshList(){
    this.projectsService.getAllProjects().subscribe(p =>{ 
    this.projects = p;
     });
  }

   createProject(model: Projects, isValid: boolean) {
        this.submitted = true;
        //CALL API
        this.projectsService.createNewProject(model).subscribe(res =>{
          this.refreshList();
        });
    }


  selectGen(id):void{
  this.router.navigate(['/projects', {outlets: {'display': [id]}}]);
  }

}
