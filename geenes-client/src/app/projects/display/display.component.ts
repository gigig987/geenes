import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DisplayService} from './shared/display.service';
import {Design} from './shared/design.class';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  
  public design:Design;
  public specimens =[];


  constructor(
    private route:ActivatedRoute,
    private displayService:DisplayService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: {id: string}) => {
      this.displayService.getGenerationByID(params.id)
      .subscribe((result) => {
                    this.specimens = result.specimens;
                    console.log(this.specimens)  // can print the data
                },
                error => {
                    console.log(error);
                });
    
    });
  }

}
