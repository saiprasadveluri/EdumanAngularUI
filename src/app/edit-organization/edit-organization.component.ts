import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { OrganizationDTO } from '../app-models';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {
  OrgId:string="";
  
  FrmGroup:FormGroup=new FormGroup({});
  constructor(private CurRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService) { 
    CurRoute.params.subscribe(prms=>{
       this.OrgId= prms["id"]; 

       this.FrmGroup=this.fb.group({
        orgName:[''],
        orgCode:[''],
        orgAddress:[''],
        orgPOC:[''],
        orgMobile:[''],
        orgEmail:['']
       });

    });
    
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit():void
  {
    this.srv.GetSelectedOrganization(this.OrgId).subscribe(data=>{
      if(data.length>0)
      {
          let SelOrg:OrganizationDTO|undefined;
          SelOrg=data.filter(obj=>{return obj.orgId==this.OrgId})[0];
          console.log(this.FrmGroup.controls['orgName']);
          console.log(SelOrg.orgName);
          //this.FrmGroup.controls.orgName.setValue(this.SelOrg.orgName,{});
          this.FrmGroup.patchValue({orgName:SelOrg.orgName});
          this.FrmGroup.patchValue({orgCode:SelOrg.orgCode});
          this.FrmGroup.patchValue({orgAddress:SelOrg.orgAddress});
          this.FrmGroup.patchValue({orgPOC:SelOrg.orgPOC});
          this.FrmGroup.patchValue({orgMobile:SelOrg.orgMobile});
          this.FrmGroup.patchValue({orgEmail:SelOrg.orgEmail});
      }      
  });
  }  
  UpdateRecord():void{
    let OrgName:string;
    let OrgCode:string;
    let OrgAddress:string;
    let OrgPOC:string;
    let OrgEmail:string;
    let OrgMobile:string;

    let UpdOrg:OrganizationDTO=new OrganizationDTO();

    UpdOrg.orgId=this.OrgId;
   

    OrgName=this.FrmGroup.get("orgName")?.value;
    OrgCode=this.FrmGroup.get("orgCode")?.value;
    OrgAddress=this.FrmGroup.get("orgAddress")?.value;
    OrgPOC=this.FrmGroup.get("orgPOC")?.value;
    OrgEmail=this.FrmGroup.get("orgEmail")?.value;
    OrgMobile=this.FrmGroup.get("orgMobile")?.value;
    UpdOrg.orgName=OrgName;
    UpdOrg.orgCode=OrgCode;
    UpdOrg.orgAddress=OrgAddress;
    UpdOrg.orgPOC=OrgPOC;
    UpdOrg.orgEmail=OrgEmail;
    UpdOrg.orgMobile=OrgMobile;

    console.log(UpdOrg.orgCode);
    this.srv.UpdateOrganization(UpdOrg).subscribe(data=>{
      console.log("Add success");
      this.route.navigate(['/Organization']);
    });
  }      
  }

