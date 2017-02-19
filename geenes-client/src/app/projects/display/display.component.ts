import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {DisplayService} from './shared/display.service';
import {Generation} from './shared/generation.interface';


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  currentGeneration : Generation;

  constructor(
    private route:ActivatedRoute,
    private displayService:DisplayService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: {id: string}) => {
      console.log(params.id);
      this.currentGeneration = this.displayService.getGenerationByID(params.id);
      
    });
  }

}
