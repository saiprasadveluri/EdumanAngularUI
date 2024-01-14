import { Component, OnInit } from '@angular/core';
import { RoleMasterDTO, UserInfoDTO } from '../app-models';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';
import { AppRoleEnum } from '../app-role-enum.enum';

@Component({
  selector: 'app-org-admin-manage',
  templateUrl: './org-admin-manage.component.html',
  styleUrls: ['./org-admin-manage.component.css']
})
export class OrgAdminManageComponent implements OnInit {
  roleList:RoleMasterDTO[]=[];
  userList:UserInfoDTO[]=[];
  selRole:number=0;
  CurUsr:UserInfoDTO|undefined;
  form = new FormGroup({
    selRole: new FormControl('', Validators.required),
    name:new FormControl('', Validators.required),
    userId:new FormControl('', Validators.required),
    mobNo:new FormControl('', Validators.required),
    emailid:new FormControl('', Validators.required)
  });
  constructor(private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService) { }

  ngOnInit(): void {
   /* this.srv.GetAllRoles().subscribe(data=>{
    this.roleList=data;
   });
 */
   let orgId=localStorage.getItem("SelOrg")!;
   console.log('Feching users for Org:'+orgId);
   this.srv.GetAllOrgUserList(orgId).subscribe(otp=>{
    var CurUsrString=localStorage.getItem("UserInfo");
    console.log(CurUsrString);
    this.CurUsr=JSON.parse(CurUsrString!);
    console.log(this.CurUsr);
    this.userList=otp.filter(u=>u.roleVal==AppRoleEnum.ORG_ADMIN && u.id!=this.CurUsr!.id)
    console.log(otp);
   });

  }

  AddOrgAdmin():void{
    let uinfo:UserInfoDTO= new UserInfoDTO();
    uinfo.roleVal=AppRoleEnum.ORG_ADMIN;//this.form.get("selRole")?.value;
    uinfo.name=this.form.get("name")?.value!;
    uinfo.userId=this.form.get("userId")?.value!;
    uinfo.mobNo=this.form.get("mobNo")?.value!;
    uinfo.emailid=this.form.get("emailid")?.value!;
    if(localStorage.getItem("SelOrg")!=null)
    {
      uinfo.orgId = localStorage.getItem("SelOrg")!;
      console.log(uinfo);
      this.srv.AddOrgUser(uinfo).subscribe(data=>{
        console.log(data);
        this.UpdateAdminUserList();
      })
    }
    
  }

  OnDelete(mapId:string|undefined)
  {
    this.srv.DeleteOrgUser(mapId!).subscribe(()=>{
      this.UpdateAdminUserList();
    })
  }

  UpdateAdminUserList()
  {
    var orgId=localStorage.getItem("SelOrg")!;
    this.srv.GetAllOrgUserList(orgId).subscribe(otp=>{
      this.userList=otp.filter(u=>u.roleVal==AppRoleEnum.ORG_ADMIN && u.id!=this.CurUsr!.id);;
      console.log(otp);
    });
  }
  OnEdit(mapId:string|undefined){
    this.route.navigate(['/Home/OrgAdminEdit',mapId]);
  }

}
