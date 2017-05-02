import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';


// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class RatingService {

  constructor(private http: Http) { }
   updateFitness(id: String,body: Object): Observable<any>{
        let bodyString = JSON.stringify(body); 
        let headers    = new Headers({ 'Content-Type': 'application/json' }); 
        let options    = new RequestOptions({ headers: headers }); 
          console.log(body);
        return this.http.put('/api/specimen/'+id+'/fitness', body, options) // ...using post request
                         .map((res:Response) => res.json()) // ...and calling .json() on the response to return data
                         .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
  }
}
