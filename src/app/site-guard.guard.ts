import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NewUserInfo } from './app-models';

@Injectable({
  providedIn: 'root'
})
export class SiteGuardGuard implements CanActivate {
 constructor(private router:Router)
 {

 } 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree 
    {
      var ReqRolesArray:number[]=route.data['roles'];
      let uinfo:NewUserInfo= JSON.parse(localStorage.getItem("UserInfo")!);
      let CurRole:number=uinfo.roleVal;
     var FoundVal= ReqRolesArray.find(itm=>itm==CurRole)
     if(FoundVal==undefined)
     {
      alert('Not authorized to access this page');
      this.router.navigate(['Login']);
     }
     return true;
    }
  
}
