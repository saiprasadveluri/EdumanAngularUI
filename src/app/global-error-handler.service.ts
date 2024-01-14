import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  constructor(private injector: Injector) {

  }

  handleError(error:any) { 
    let router = this.injector.get(Router);    
    
    router.navigate(['/ErrorView',error.message]);
}
}
