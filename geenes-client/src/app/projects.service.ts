import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProjectsService {

   constructor(private http: Http) { }

   // Get all projects from the API
  getAllProjects() {
    return this.http.get('/api/projects')
      .map(res => res.json());
  }
}
