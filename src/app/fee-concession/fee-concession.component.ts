import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,FormBuilder,FormControl, FormArray} from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';
import { AcdYearDTO, FeeConcessionDTO, FeeConcessionViewDTO, FeeHeadMasterDTO, FeeMasterDTO, StandardDTO, StudentFeeInfoDTO, StudentInfoDTO } from '../app-models';
import { AddFeeMasterActionEnum, ConcessionTypeEnum } from '../app-role-enum.enum';
import { ShowMessageDialog } from 'src/site';

@Component({
  selector: 'app-fee-concession',
  
  templateUrl: './fee-concession.component.html',
  styleUrl: './fee-concession.component.css'
})
export class FeeConcessionComponent {
  frmGroup:FormGroup;
  frmConcession:FormGroup|undefined;
  AcdYearCtrl:FormControl=new FormControl(['']);
  SelStdCtrl:FormControl=new FormControl(['']);
  SelStudentCtrl:FormControl=new FormControl(['']);
  SelTermCtrl:FormControl=new FormControl(['']);
  ReasonCtrl:FormControl=new FormControl(['']);
  NotesCtrl:FormControl=new FormControl(['']);
  AcdYearDTOArray:AcdYearDTO[]=[];
  StandardDTOArrya:StandardDTO[]=[];
  SelOrg:string|null;
  StudentInfoDTOArray:StudentInfoDTO[]=[];
  StudentFeeInfoDTOObj:StudentFeeInfoDTO|undefined;
  TermsArray:number[]=[];
  LineSize:number=0;
  sectionGrp:FormGroup|undefined;
 FeeConcessionData:FeeConcessionViewDTO[]=[];
    
  concessionTypes= ConcessionTypeEnum;
  map: {id: number; name: string}[] = [];
  constructor(private curRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {
    this.SelOrg = localStorage.getItem("SelOrg");

    for(var n in ConcessionTypeEnum) {
      if (typeof ConcessionTypeEnum[n] === 'number') {
          this.map.push({id: <any>ConcessionTypeEnum[n], name: n});
      }
      }
    this.frmGroup=fb.group({      
      AcdYear:this.AcdYearCtrl,
      SelStd:this.SelStdCtrl,
      SelStu:this.SelStudentCtrl,
      SelTerm:this.SelTermCtrl
    });
   
    this.srv.GetAllAcdYears().subscribe(acds=>{
      this.AcdYearDTOArray=acds;
      console.log(acds);
      this.srv.GetAllOrgStandards(this.SelOrg!).subscribe(
        stnds=>{
          this.StandardDTOArrya=stnds;
          this.TermsArray=Array.from({length: 10}, (_, i) => i + 1);        
        }
      )
    })
  }

  ngOnInit(): void {
    this.frmConcession=this.fb.group({
      reason:this.ReasonCtrl,
      notes:this.NotesCtrl
    });
  }

  OnSelectedStandardChange()
  {
    let SelYear=this.AcdYearCtrl.value;
    let StdId=this.SelStdCtrl.value;
    this.srv.GetAllStudentInfo(SelYear,StdId).subscribe(sinfo=>{
      this.StudentInfoDTOArray=sinfo;
    });
  }

  ShowGrid(StuMapId:string)
  {
    this.srv.GetStudentFeeConcession(StuMapId).subscribe(res=>{
      this.FeeConcessionData=res;
    })
  }
 
  ShowStudentFeeInfo()
  {
    let mapId=this.SelStudentCtrl.value;
    let TermNumber=this.SelTermCtrl.value;
    this.ShowGrid(mapId);
    
    this.srv.GetStudentFeeInfo(mapId,TermNumber).subscribe(res=>{
      this.StudentFeeInfoDTOObj=res;
      this.LineSize=this.StudentFeeInfoDTOObj.lines.length;

      this.sectionGrp = this.fb.group({
       
      });
      this.frmConcession!.addControl('sectionGrp',this.sectionGrp);
      res.lines.forEach((sub,indx)=>{
        var rowGrp = this.fb.group({});
       
        this.sectionGrp!.addControl('curRow_'+indx,rowGrp);
        rowGrp.addControl('Selection',this.fb.control(''));
        rowGrp.addControl('HeadName',this.fb.control(sub.hn));
        rowGrp.addControl('Term',this.fb.control(sub.termNo));
        rowGrp.addControl('TotAmount',this.fb.control(sub.totAmt));
        rowGrp.addControl('AvailCon',this.fb.control(sub.conAmout));
        rowGrp.addControl('Amount',this.fb.control(''));        
      });
      console.log(this.frmConcession);
    });
  }
  AddConsessions()
  {
    //var grpsectionGrp= this.frmConcession?.controls['sectionGrp'] as FormGroup;
     var SecGrp=this.frmConcession!.controls['sectionGrp'] as FormGroup;
     console.log(SecGrp);
     let ConcessionArray:FeeConcessionDTO[]=[];
     var Reason:string=this.frmConcession!.controls['notes'].value;
     var ConType:number=this.frmConcession!.controls['reason'].value;
     for(var i=0;i<this.LineSize;++i)
     {
      let rowGrp=SecGrp.controls['curRow_'+i] as FormGroup;
      let checked=rowGrp.controls['Selection'].value;
      if(checked)
      {
        let rec:FeeConcessionDTO = new FeeConcessionDTO();
        rec.feeId=this.StudentFeeInfoDTOObj!.lines[i].fid;
        rec.mapId=this.SelStudentCtrl.value;
        rec.amt=rowGrp.controls['Amount'].value;
        rec.reason=Reason;
        rec.concessionType=ConType;
        ConcessionArray.push(rec);
      }
     }
     if(ConcessionArray.length>0)
     {
      console.log(ConcessionArray);
      this.srv.AddFeeConcessions(ConcessionArray).subscribe(res=>{
        this.logger.ShowMessage("Info","Success in Adding concessions");
        this.ShowStudentFeeInfo();
      })
     }
  }

  RemoveConcession(conId:string)
  {
    this.srv.DeleteStudentFeeConcession(conId).subscribe(res=>{
    this.logger.ShowMessage("Info","Success in removing concessions");
    this.ShowStudentFeeInfo();    
    })
  }
  
}
