import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Design } from '../shared/design.class'
import { Genes } from '../shared/genes.interface'

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DisplayService {
  result: Array<Object>;

  constructor(private http: Http) { }

  // Get all templates from the API
  getGenerationByID(id) {
    return this.http.get('/api/generation/' + id)
      .map((res) => res.json())
  }
  // Get all generations of a specific project from the API
  getGenerationsByProjectID(id) {
    return this.http.get('/api/projects/'+id+'/generations/' )
      .map((res) => res.json())
  }
  // call the stylist API
  getStyleByTemplateString(template: String, genesArray: Array<number>):Observable<any> {
    let headers    = new Headers({ 'Content-Type': 'application/json' }); 
    let options    = new RequestOptions({ headers: headers }); 
    let body = JSON.stringify({ 
      "template": template, 
      "genesArray": genesArray
     });
    return this.http.post('/api/stylist', body, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
  }

}
