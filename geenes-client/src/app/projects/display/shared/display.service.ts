import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Design } from '../shared/design.class'
import { Genes } from '../shared/genes.interface'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

var headers = new Headers();


@Injectable()
export class DisplayService {
  result: Array<Object>;

  constructor(private http: Http) { }

  // Get all templates from the API
  getGenerationByID(id) {
    return this.http.get('/api/generation/' + id)
      .map((res) => res.json())
  }
  // call the stylist API
  getStyleByTemplateString(template: String, genesArray: Array<number>) {
    headers.append('Content-Type', 'application/json');
    var body = JSON.stringify({ 
      "template": template, 
      "genesArray": genesArray
     });
     console.log(body, headers);

    return this.http.post('/api/stylist', body, {headers:headers})
      .map((res) => res.json())
  }
  getFuzzy(){
    return 'cane';
  }

}
