import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class DisplayService {

  constructor(private http:Http) { }

    // Get all templates from the API
  getGenerationByID(id) {
    return this.http.get('/api/generation/' + id)
      .map(res => res.json())
      .subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('yay')
      );
      }

}
