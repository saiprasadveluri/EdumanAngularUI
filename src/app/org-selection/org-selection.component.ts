import { Component, Input, OnInit } from '@angular/core';
import { NewUserInfo, UserOrgMapDTO} from '../app-models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';

@Component({
  selector: 'app-org-selection',
  templateUrl: './org-selection.component.html',
  styleUrls: ['./org-selection.component.css']
})
export class OrgSelectionComponent implements OnInit {

form = new FormGroup({
  OrgSite: new FormControl('', Validators.required)
});
 CurUsr:NewUserInfo|undefined;
 CurRecs:UserOrgMapDTO[]=[];
 CurMap:UserOrgMapDTO|undefined;
  constructor(private route:Router,private srv:DbAccessServiceService ) { 
       
  }
  ngAfterViewInit():void
  {
    let CurRecString:string|null=localStorage.getItem("UserInfo");
    console.log(CurRecString);
    
    if(CurRecString!=null)
    {
      this.CurUsr=JSON.parse(CurRecString);
      this.srv.GetUserOrganizationsInfo(this.CurUsr!.id).subscribe(orgs=>{
        localStorage.setItem("UserOrgs",JSON.stringify(orgs));
        this.CurRecs=orgs;
      })
    } 
  }
  ngOnInit(): void {
   
  }
  MoveToHome():void{
    this.SetHeaderData();
    this.route.navigate(['Home']);
  }

  AddOrgnization()
  {
    this.SetHeaderData();
    this.route.navigate(['AddOrganization']);
  }

  onSelectChange(inp:any)
  {
    console.log(inp.Curmap);
  }

  ManageOrgnization()
  {
    this.SetHeaderData();
    this.route.navigate(['Organization']);
  }

  SetHeaderData()
  {
    /*let SelObj:string=this.form.controls["OrgSite"].value!;
    console.log("selected Org: "+SelObj);
    
      localStorage.setItem("SelctedOrgId",SelObj!);
      localStorage.setItem("SelctedOrgName",SelObj.orgName!);
      let UserOrgMapsString =localStorage.getItem("UserOrgs");
      let UserOrgMaps:UserOrgMapDTO[] = JSON.parse(UserOrgMapsString!);
      let CurMap:UserOrgMapDTO|undefined=UserOrgMaps.find(m=>m.orgId==SelObj.orgId);
      console.log(CurMap!.roleId!);
      localStorage.setItem("SelctedRoleId",CurMap!.roleId!);
      localStorage.setItem("SelctedRoleName",CurMap!.roleName!);*/
  
  }
}
