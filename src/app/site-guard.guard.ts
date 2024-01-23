import { Injectable, inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { NewUserInfo } from './app-models';

export const authGuard: CanActivateFn=(route:ActivatedRouteSnapshot,
                                      state: RouterStateSnapshot)=>{
                                        console.log('from CanActivateFn');
                                        var ReqRolesArray:number[]=route.data['roles'];
                                        let UInfoString:string|null=localStorage.getItem("UserInfo");
                                        console.log(UInfoString);
                                        let uinfo:NewUserInfo= JSON.parse(UInfoString!);
                                        let CurRole:number=uinfo.roleVal;
                                        console.log(ReqRolesArray);
                                        console.log(CurRole);
                                        var FoundVal= ReqRolesArray.find(itm=>itm==CurRole)
                                        console.log(FoundVal);
                                        if(FoundVal==undefined)
                                        {
                                          alert('Not authorized to access this page');
                                          inject(Router).navigate(['Login']);
                                        }
                                        return true;
                                      }
/*@Injectable({
  providedIn: 'root'
})
export class SiteGuardGuard implements CanActivate<> {
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
  
}*/
