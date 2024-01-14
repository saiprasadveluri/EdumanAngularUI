import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';
import { FeeHeadMasterDTO } from '../app-models';

@Component({
  selector: 'app-manage-fee-heads',  
  templateUrl: './manage-fee-heads.component.html',
  styleUrl: './manage-fee-heads.component.css'
})
export class ManageFeeHeadsComponent implements OnInit{
  frmGroup:FormGroup;
  FeeHeads:FeeHeadMasterDTO[]=[];
  FeeHeadNameCtrl:FormControl=new FormControl(['']);
  FeeHeadTypeCtrl:FormControl=new FormControl(['']);
  FeeTermsCtrl:FormControl=new FormControl(['']);

  constructor(private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {    
    this.frmGroup=fb.group({FeeHeadName:this.FeeHeadNameCtrl,
      FeeHeadType:this.FeeHeadTypeCtrl,
      FeeTerms:this.FeeTermsCtrl});
  }
  ngOnInit(): void {
    this.UpdateGrid();
  }

  UpdateGrid()
  {
    let SelOrg=localStorage.getItem("SelOrg");
    this.srv.GetAllFeeHeads(SelOrg!).subscribe(res=>{
      console.log(res);
      this.FeeHeads=res;
    })
  }
  AddNewFeeHead()
  {
    let Name:string=this.FeeHeadNameCtrl.value;
    let FeeHeadType:number=this.FeeHeadTypeCtrl.value;
    let FeeTerms:number=this.FeeTermsCtrl.value;
    let SelOrg=localStorage.getItem("SelOrg");
    let HeadObj:FeeHeadMasterDTO=new FeeHeadMasterDTO();
    HeadObj.orgId=SelOrg!;
    HeadObj.feeHeadName=Name;
    HeadObj.feeType=FeeHeadType;
    HeadObj.terms=FeeTerms;
    this.srv.AddNewFeeHead(HeadObj).subscribe(res=>{
      this.UpdateGrid();      
    });
  }
  EditFeeHead(feeHeadId:string)
  {

  }
  DeleteFeeHead(feeHeadId:string)
  {
    this.srv.DeleteFeeHead(feeHeadId).subscribe(res=>{
      this.UpdateGrid();
    });
  }
  ManageSchoolFees(feeHeadId:string)
  {
    this.route.navigate(['Home/ManageSchoolFee',feeHeadId]);
  }
  ManageClassFees(feeHeadId:string)
  {
    this.route.navigate(['Home/ManageClassFees',feeHeadId]);
  }
  ManageStudentFees(feeHeadId:string)
  {
    this.route.navigate(['Home/ManageStudentFees',feeHeadId]);
  }
}
