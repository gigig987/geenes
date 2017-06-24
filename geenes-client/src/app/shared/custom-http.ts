import { Injectable } from "@angular/core";
import { ConnectionBackend, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
// import { appConfig } from '../app.config';
 
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
 
@Injectable()
export class CustomHttp extends Http {
    domain = '' //'http://localhost:3000/'
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }
 
    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.get(this.domain + url, this.addJwt(options)).catch(this.handleError);
    }
 
    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.post(this.domain + url, body, this.addJwt(options)).catch(this.handleError);
    }
 
    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.put(this.domain + url, body, this.addJwt(options)).catch(this.handleError);
    }
 
    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return super.delete(this.domain + url, this.addJwt(options)).catch(this.handleError);
    }
 
    // private helper methods
 
    private addJwt(options?: RequestOptionsArgs): RequestOptionsArgs {
        // ensure request options and headers are not null
        options = options || new RequestOptions();
        options.headers = options.headers || new Headers();
 
        // add authorization header with jwt token
        let currentUserToken = localStorage.getItem('token');
        if (currentUserToken) {
            options.headers.append('Authorization', 'Bearer ' + currentUserToken);
        }
 
        return options;
    }
 
    private handleError(error: any) {
        if (error.status === 401) {
            // 401 unauthorized response so log user out of client
            window.location.href = '/login';
        }
 
        return Observable.throw(error._body);
    }
}
 
export function customHttpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new CustomHttp(xhrBackend, requestOptions);
}
 
export let customHttpProvider = {
    provide: Http,
    useFactory: customHttpFactory,
    deps: [XHRBackend, RequestOptions]
};