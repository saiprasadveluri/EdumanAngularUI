import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccessLevelCheck } from './AccessLevel';

@Injectable({
  providedIn: 'root'
})
export class AccessGaurdGuard implements CanActivate {
  accessCheck:AccessLevelCheck;
  constructor(private _router:Router)
  {
    this.accessCheck=new AccessLevelCheck();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
  {
    console.log(state.url);
    let AllowUser=this.accessCheck.CheckAccess(state.url);
    if(AllowUser==false)
    {
      alert('You are not allowed to view this page. You are redirected to Home Page'); 
      this._router.navigate(['Home']);
      return false;
    }
    else
      return true;
  }
  
}
