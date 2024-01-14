import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';
import { NewUserInfo } from '../app-models';
import { LoggerhelperService } from '../loggerhelper.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  fg:FormGroup;
  ctrlUserName:FormControl=new FormControl('');
  ctrlUserPwd:FormControl=new FormControl('');
  ctrlOrgSite:FormControl=new FormControl('');
  CurUserInfo:NewUserInfo|undefined;
  
  constructor(private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {
    console.log('from login form');
    this.fg=fb.group({ctrlUserName:this.ctrlUserName,ctrlUserPwd:this.ctrlUserPwd,ctrlOrgSite:this.ctrlOrgSite});
  }

  ngOnInit(): void {

  }
  VerifyCreds()
  {
    this.logger.ShowMessage("Info","Please wait....");
    this.srv.VerifyCreds(this.ctrlUserName.value,this.ctrlUserPwd.value)
    .subscribe(data=>{
      this.logger.HideMessage();
      console.log(data);
      this.CurUserInfo=data
    });
  }
  LoginUser(){
    this.logger.ShowMessage("Info","Please wait....");
    let SelOrg:string;
    SelOrg=this.ctrlOrgSite.value;
    console.log('ctrlOrgSite:'+SelOrg);
    this.srv.GetJWTToken(this.ctrlUserName.value,this.ctrlUserPwd.value,SelOrg)
    .subscribe(data=>{
      this.logger.HideMessage();
        let CurRec:NewUserInfo;
        CurRec=data;
        console.log(JSON.stringify(CurRec));
        
        localStorage.setItem("UserInfo",JSON.stringify(CurRec));
        localStorage.setItem('SelOrg',SelOrg);
        localStorage.setItem('Auth',"YES");
          localStorage.setItem("AuthToken",CurRec.jwtTokenString);
          this.route.navigate(['Home']);
       });
  }
  SiteAdminLogin()
  {
    this.srv.GetJWTToken(this.ctrlUserName.value,this.ctrlUserPwd.value,undefined)
    .subscribe(data=>{
        let CurRec:NewUserInfo;
        CurRec=data;
        console.log(JSON.stringify(CurRec)); 
        localStorage.setItem("UserInfo",JSON.stringify(CurRec));       
        localStorage.setItem('Auth',"YES");
          localStorage.setItem("AuthToken",CurRec.jwtTokenString);
          this.route.navigate(['SiteAdminHome']);
       });
  }
}
