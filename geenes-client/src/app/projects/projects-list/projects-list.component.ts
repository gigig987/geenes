
import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../shared/projects-list.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router }  from '@angular/router';

import { Projects } from '../shared/projects.interface';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.css']
})
export class ProjectsListComponent implements OnInit {

   // instantiate projects to an empty array
  projects: any = [];
  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public _currentRange: number = 0.05;
  public _projectGenerations: number;
  public selected: boolean;
  public prevSelected: boolean;

  constructor(private projectsService : ProjectsService, private _fb: FormBuilder, private router:Router) { }

  ngOnInit() {
    this.refreshList();
        // form
    this.myForm = this._fb.group({
            name: ['', [<any>Validators.required, <any>Validators.minLength(3)]],
            mRate: [this._currentRange, [<any>Validators.required]]
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

  onChange(value:number):void {
    this._currentRange = value;
  }

  selectGen(id):void{
  this.router.navigate(['/projects', {outlets: {'display': [id]}}]);
  }
}
