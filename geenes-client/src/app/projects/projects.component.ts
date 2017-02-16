import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

import { Projects } from '../projects.interface';

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
  public _currentRange: number = 0.05;
  public _projectGenerations: number;
  public selected: boolean;
  public prevSelected: boolean;

  constructor(private projectsService : ProjectsService, private _fb: FormBuilder) { }

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
    console.log(this.projects)
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

  onSelect(_id):void{
    // this.projectsService.getGenerationsCount(_id).subscribe(res =>{
    //   this._projectGenerations = res;
    //   this.selected = true;
    //   this.prevSelected =  false;
    // })
    console.clear();
    console.log(_id);
  }
}
