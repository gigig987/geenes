import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
 
 
@Injectable()
export class AuthenticationService {
    domain = 'http://localhost:3000/'

    constructor(private http: Http) { }
 
    login(username: string, password: string) {
        return this.http.post(this.domain + 'api/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', user.token);
                    localStorage.setItem('userId', user._id);
                }
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
}