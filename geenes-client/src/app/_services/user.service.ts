import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
 

import { User } from '../_models/user.model';
 
@Injectable()
export class UserService {
    constructor(private http: Http) { }
 
    getAll() {
        return this.http.get('api/users', this.jwt()).map((response: Response) => response.json());
    }
 
    getById(_id: string) {
        return this.http.get('api/users/' + _id, this.jwt()).map((response: Response) => response.json());
    }
 
    create(user: User) {
        return this.http.post('api/users/register', user, this.jwt());
    }
 
    update(user: User) {
        return this.http.put('api/users/' + user._id, user, this.jwt());
    }
 
    delete(_id: string) {
        return this.http.delete('api/users/' + _id, this.jwt());
    }
 
    // private helper methods
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}