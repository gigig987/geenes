import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProjectsService {

   constructor(private http: Http) { }

   // Get all projects from the API
  getAllProjects() {
    return this.http.get('/api/projects')
      .map(res => res.json());
  }
   // Get all generations from projects from the API
  getGenerationsCount(_id) {
    return this.http.get('/api/projects/'+_id+'/gen')
      .map(res => res.json());
  }

  createNewProject(body: Object): Observable<any>{
        let bodyString = JSON.stringify(body); 
        let headers    = new Headers({ 'Content-Type': 'application/json' }); 
        let options    = new RequestOptions({ headers: headers }); 
          console.log(body);
        return this.http.post('/api/projects', body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
  }
}
