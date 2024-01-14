import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { OrganizationDTO } from '../app-models';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {
  OrgLst:OrganizationDTO[]|null=null;
  constructor(private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService) { 

  }

  ngOnInit(): void {    
    this.srv.GetAllOrgList().subscribe(data=>{
        this.OrgLst=data;
        console.log(this.OrgLst);
    });    
  }
 
  OnEdit(itm:OrganizationDTO):void
    {
      console.log(itm.orgId);
        this.route.navigate(['/EditOrganization',itm.orgId]);
    }

    AddOrg()
    {
      this.route.navigate(['/SiteAdminHome/AddOrganization']);
    }

    OnDelete(orgId:string|undefined):void
    {
      console.log('Deleting ORG :'+orgId);
      if(orgId!=undefined)
      {
        this.srv.DeleteOrganizaion(orgId).subscribe(res=>{
          this.srv.GetAllOrgList().subscribe(data=>{
            this.OrgLst=data;
            console.log('Updated List:');
            console.log(this.OrgLst);
        }); 
        });
      }
      else
      {
        console.log('OrdID is Undefined');
      }
    }

    
}
