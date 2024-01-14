import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AcdYearDTO, FeeDefaulterInfoDTO, StandardDTO } from '../app-models';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';

@Component({
  selector: 'app-fee-defaulters',
  
  templateUrl: './fee-defaulters.component.html',
  styleUrl: './fee-defaulters.component.css'
})
export class FeeDefaultersComponent {
  frmGroup:FormGroup;
  frmConcession:FormGroup|undefined;
  AcdYearCtrl:FormControl=new FormControl(['']);
  SelStdCtrl:FormControl=new FormControl(['']);  
  SelTermCtrl:FormControl=new FormControl(['']);

  AcdYearDTOArray:AcdYearDTO[]=[];
  StandardDTOArrya:StandardDTO[]=[];
  TermsArray:number[]=[];
  SelOrg:string|null;
  FeeDefaulters:FeeDefaulterInfoDTO[]=[];
  columns:string[]=['stn','regdNo','stuName','headName','term','feeAmt','concession'];
  constructor(private curRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {
    this.SelOrg = localStorage.getItem("SelOrg");
    this.frmGroup=fb.group({      
      AcdYear:this.AcdYearCtrl,
      SelStd:this.SelStdCtrl,
      //SelStu:this.SelStudentCtrl,
      SelTerm:this.SelTermCtrl
    });
    this.srv.GetAllAcdYears().subscribe(acds=>{
      this.AcdYearDTOArray=acds;
      console.log(acds);
      this.srv.GetAllOrgStandards(this.SelOrg!).subscribe(
        stnds=>{
          this.StandardDTOArrya=stnds;
          this.TermsArray=Array.from({length: 12}, (_, i) => i + 1);        
        }
      )
    })
  }
  GetDefaultersData()
  {
    alert(this.AcdYearCtrl.value);
    this.srv.GetDefaultersData(this.SelStdCtrl.value,this.AcdYearCtrl.value,
      this.SelTermCtrl.value,this.SelOrg!).subscribe(res=>{
        console.log(res);
        this.FeeDefaulters=res;
      });
  }
}
