import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationDTO } from '../app-models';
import { DbAccessServiceService } from '../db-access-service.service';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {

  FrmGroup:FormGroup=new FormGroup({});
  constructor(private CurRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService) { 
      this.FrmGroup=this.fb.group({
        orgName:[''],
        orgCode:[''],
        orgAddress:[''],
        orgPOC:[''],
        orgMobile:[''],
        orgEmail:['']
       });

    };
    

  ngOnInit(): void {
  }

  AddRecord():void{
    let OrgName:string;
    let OrgCode:string;
    let OrgAddress:string;
    let OrgPOC:string;
    let OrgEmail:string;
    let OrgMobile:string;

    let UpdOrg:OrganizationDTO=new OrganizationDTO();
    
    OrgName=this.FrmGroup.get("orgName")?.value;
    OrgCode=this.FrmGroup.get("orgCode")?.value;
    OrgAddress=this.FrmGroup.get("orgAddress")?.value;
    OrgPOC=this.FrmGroup.get("orgPOC")?.value;
    OrgEmail=this.FrmGroup.get("orgEmail")?.value;
    OrgMobile=this.FrmGroup.get("orgMobile")?.value;
    //UpdOrg.orgId=undefined;
    UpdOrg.orgName=OrgName;
    UpdOrg.orgCode=OrgCode;
    UpdOrg.orgAddress=OrgAddress;
    UpdOrg.orgPOC=OrgPOC;
    UpdOrg.orgEmail=OrgEmail;
    UpdOrg.orgMobile=OrgMobile;
    console.log('From Add Method:');
    console.log(UpdOrg);
    this.srv.AddeOrganization(UpdOrg).subscribe(data=>{
      console.log("Add org success");
      this.route.navigate(['Organization']);
    });
  }

}
