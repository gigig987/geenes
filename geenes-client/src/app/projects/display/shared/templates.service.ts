import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TemplatesService {
  domain = 'http://localhost:3000/'
  constructor(private http: Http) { }
  // Get all templates from the API
  getAllTemplates() {
    return this.http.get(this.domain + 'api/templates')
      .map(res => res.json());
  }
  

}
