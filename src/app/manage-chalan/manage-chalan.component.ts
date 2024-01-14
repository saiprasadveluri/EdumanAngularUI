import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AcdYearDTO, ChalanInfoDTO, StandardDTO, StudentInfoDTO } from '../app-models';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { ChalanInfoVM, ChalanVM } from '../view-models';
import { LoggerhelperService } from '../loggerhelper.service';


@Component({
  selector: 'app-manage-chalan',  
  templateUrl: './manage-chalan.component.html',
  styleUrl: './manage-chalan.component.css'
})
export class ManageChalanComponent {
  frmGroup:FormGroup;
  frmConcession:FormGroup|undefined;
  AcdYearCtrl:FormControl=new FormControl(['']);
  SelStdCtrl:FormControl=new FormControl(['']);
  //SelStudentCtrl:FormControl=new FormControl(['']);
  SelTermCtrl:FormControl=new FormControl(['']);
  AcdYearDTOArray:AcdYearDTO[]=[];
  StandardDTOArrya:StandardDTO[]=[];
  TermsArray:number[]=[];
  SelOrg:string|null;
  ChalanVMs:ChalanVM[]=[];
  CurDate:any=new Date();
  //StudentInfoDTOArray:StudentInfoDTO[]=[];
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
  GenerateBulkChalan()
  {
    this.ChalanVMs=[];
    this.srv.GenerateBulkChalan(this.SelStdCtrl.value!,this.AcdYearCtrl.value,this.SelTermCtrl.value).subscribe(res=>{
      res.map(dto=>{
        let chlnVmObj:ChalanVM=new ChalanVM();
        chlnVmObj.regdNo = dto.regdNo;
        chlnVmObj.name=dto.name;
        chlnVmObj.stndardname=dto.stndardname;
        chlnVmObj.chlnNum=dto.chlnNum;
        dto.info.map(inf=>{
           let infoObj:ChalanInfoVM=new ChalanInfoVM();
           infoObj.hN= inf.hn;
           infoObj.termNo = inf.termNo,
           infoObj.totAmt = inf.totAmt,
           infoObj.paid = inf.paid,
           infoObj.due = inf.totAmt - inf.paid
           chlnVmObj.TotalDue+=infoObj.due;
           chlnVmObj.info.push(infoObj);
        });
        this.ChalanVMs.push(chlnVmObj);
      })
    })
  }
}
