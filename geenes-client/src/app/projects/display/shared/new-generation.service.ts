import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class NewGenerationService {

  constructor(private http: Http) { }

    // call the stylist API
  createNewGeneration(mRate: number, id:string):Observable<any> {
    let headers    = new Headers({ 'Content-Type': 'application/json' }); 
    let options    = new RequestOptions({ headers: headers }); 
    let body = JSON.stringify({ 
      "mRate": mRate
     });
    return this.http.post('/api/generation/'+id, body, options)
      .map((res:Response) => res.json())
      .catch((error:any) => Observable.throw(error.json().error || 'Server error')); 
  }

}
