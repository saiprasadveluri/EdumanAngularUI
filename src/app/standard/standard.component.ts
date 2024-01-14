import { Component, OnInit } from '@angular/core';
import { StandardDTO } from '../app-models';
import { ComponentBase } from '../component-base';

import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';

@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent implements OnInit {
OrgStandardArray:StandardDTO[]=[];
FrmGroup:FormGroup|undefined;

stdNameCtrl:FormControl=new FormControl('',[Validators.required]);

constructor(public route:Router,public fb:FormBuilder,public srv:DbAccessServiceService) { 
  this.FrmGroup= fb.group({
    stdName:this.stdNameCtrl
  });

}

  ngOnInit(): void {
    this.UpdateGrid();
  }

  UpdateGrid()
  {
    let SelOrg=localStorage.getItem('SelOrg');
    this.srv.GetAllOrgStandards(SelOrg!).subscribe(stds=>{
      this.OrgStandardArray=stds;
    });
  }

  AddRecord()
  {
    let SelOrg=localStorage.getItem('SelOrg');
    let NewStdName=this.stdNameCtrl.value;
    let NewStd:StandardDTO= new StandardDTO();
    NewStd.orgId=SelOrg!;
    NewStd.stdName=NewStdName;

    this.srv.AddOrgStandard(NewStd).subscribe(res=>{
        this.UpdateGrid();
    });
  }

  OnEdit(inp:StandardDTO){

  }
  OnDelete(StdId:string)
  {
    this.srv.DeleteOrgStandard(StdId).subscribe(res=>{
      this.UpdateGrid();
    });
  }

  ManageSubjects(StdId:string)
  {
    this.route.navigate(['/Home/StdSubMap',StdId])
  }
}
