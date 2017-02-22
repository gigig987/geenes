import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {Design} from '../shared/design.class'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DisplayService {
result:Array<Object>; 
  constructor(private http:Http) { }

    // Get all templates from the API
  getGenerationByID(id) {
    console.log('/api/generation/' + id);
      return this.http.get('/api/generation/' + id)
     .map((res) => res.json())
    // .subscribe(result => this.result =result);
      
      }

}
