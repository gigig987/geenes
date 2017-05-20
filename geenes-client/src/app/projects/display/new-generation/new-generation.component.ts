import { Component, OnInit, Input } from '@angular/core';
 import {Router,ActivatedRoute} from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {NewGenerationService} from '../shared/new-generation.service';


@Component({
  selector: 'app-new-generation',
  templateUrl: './new-generation.component.html',
  styleUrls: ['./new-generation.component.css'],
  providers: [NewGenerationService]
})
export class NewGenerationComponent implements OnInit {

  @Input() id:string;

  public myForm: FormGroup; // our model driven form
  public submitted: boolean; // keep track on whether form is submitted
  public _currentRange: number = 0.05;

  constructor
  (private _fb: FormBuilder,
   private NewGenerationService: NewGenerationService,
   private _router:Router,
   private r:ActivatedRoute
   ) { }

  ngOnInit() {
         // form
    this.myForm = this._fb.group({
            mRate: [this._currentRange, [<any>Validators.required]]
        });
  }

    onChange(value:number):void {
    this._currentRange = value;
  }

     createProject(mRate: number, isValid: boolean) {
        this.submitted = true;
        //CALL API
        this.NewGenerationService.createNewGeneration(mRate, this.id).subscribe(res =>{
          console.log(res.newGenerationID);
          this._router.navigate(["../"+res.newGenerationID], { relativeTo: this.r });
        });
    }


}
