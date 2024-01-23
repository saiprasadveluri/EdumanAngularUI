import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from "@angular/core";
import { Observable } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
export class AddAuthTokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token=localStorage.getItem("AuthToken");
        console.log('Getting token....'+token);
        console.log('Requested URL: '+req.url);
        if(token!=null)
        {
            console.log('Before Colne'+ req.url);
            req = req.clone({ headers: req.headers.append('Authorization', 'Bearer ' + token) });           
            console.log('Adding the header....');
            console.log('After Closne'+req.url);
        }
        return next.handle(req);
    }

}
