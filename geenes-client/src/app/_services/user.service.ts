import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 

import { User } from '../_models/user.model';
 
@Injectable()
export class UserService {
    domain = 'http://localhost:3000/'
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get(this.domain + 'api/users').map((response: Response) => response.json());
    }
 
    getById(_id: string) {
        return this.http.get(this.domain + 'api/users/' + _id).map((response: Response) => response.json());
    }

    getCurrent() {
        return this.http.get(this.domain + 'api/users/current').map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post(this.domain + 'api/users/register', user);
    }
 
    update(user: User) {
        return this.http.put(this.domain + 'api/users/' + user._id, user);
    }
 
    delete(_id: string) {
        return this.http.delete(this.domain + 'api/users/' + _id);
    }
}