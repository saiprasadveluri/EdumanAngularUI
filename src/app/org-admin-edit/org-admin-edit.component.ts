import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';

import { UserInfoDTO } from '../app-models';

@Component({
  selector: 'app-org-admin-edit',
  templateUrl: './org-admin-edit.component.html',
  styleUrls: ['./org-admin-edit.component.css']
})
export class OrgAdminEditComponent implements OnInit {
MapId:string|undefined;
UserId:string|undefined;
FrmGroup:FormGroup|undefined;
CurUser:UserInfoDTO|undefined;
  constructor(private CurRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService) { 

    CurRoute.params.subscribe(prms=>{
      this.MapId= prms["recid"];
      this.FrmGroup=this.fb.group({
       userName:[''],
       email:[''],
       mobile:['']       
      });

   });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit():void
  {
    var orgId=localStorage.getItem("SelctedOrgId")!;
    this.srv.GetAllOrgUserList(orgId).subscribe(otp=>{
      var userList=otp.filter(u=>u.mapId==this.MapId);
      if(userList.length>0)
      {
        console.log(userList[0]);
        this.CurUser=userList[0];
        console.log(this.CurUser);
        this.FrmGroup!.patchValue({userName:this.CurUser.name});
          this.FrmGroup!.patchValue({email:this.CurUser.emailid});
          this.FrmGroup!.patchValue({mobile:this.CurUser.mobNo});          
      }      
    });
    }

    UpdateRecord()
    {
      let UID=this.CurUser?.id;
      let newUserName=this.FrmGroup!.controls["userName"].value;
      let newUserEmail=this.FrmGroup!.controls["email"].value;
      let newUserMobile=this.FrmGroup!.controls["mobile"].value;
      let NewUserDTO:UserInfoDTO=new UserInfoDTO();
      NewUserDTO.id=UID;
      NewUserDTO.name=newUserName;
      NewUserDTO.emailid=newUserEmail;
      NewUserDTO.mobNo=newUserMobile;
      console.log(NewUserDTO);
      this.srv.UpdateOrgUser(NewUserDTO).subscribe(()=>{
        alert('Success');
        this.route.navigate(['/Home/ManageOrgAdmin']);
      });
    }
}
