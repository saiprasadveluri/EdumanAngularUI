import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';
import { AcdYearDTO, FeeHeadMasterDTO, FeeMasterDTO, StandardDTO, StudentInfoDTO } from '../app-models';
import { AddFeeMasterActionEnum } from '../app-role-enum.enum';
import { ShowMessageDialog } from 'src/site';

@Component({
  selector: 'app-manage-student-fees',  
  templateUrl: './manage-student-fees.component.html',
  styleUrl: './manage-student-fees.component.css'
})
export class ManageStudentFeesComponent {
  frmGroup:FormGroup;
  AcdYearCtrl:FormControl=new FormControl(['']);
  SelStdCtrl:FormControl=new FormControl(['']);
  SelStudentCtrl:FormControl=new FormControl(['']);
  TermCtrl:FormControl=new FormControl(['']);
  AmountCtrl:FormControl=new FormControl(['']);
  DueMonthCtrl:FormControl=new FormControl(['']);

  AcdYearDTOArray:AcdYearDTO[]=[];
  StandardDTOArrya:StandardDTO[]=[];
  TermsArray:number[]=[];
  MonthLstArray:number[]=[];
  FeeMasterDTOArray:FeeMasterDTO[]=[];
  StudentInfoDTOArray:StudentInfoDTO[]=[];
  Hid:string="";
  SelOrg:string|null;
  SelHeadName:string="";
  SelStuMapId:string="";
  constructor(private curRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {   
    this.SelOrg = localStorage.getItem("SelOrg");

    this.frmGroup=fb.group({      
      AcdYear:this.AcdYearCtrl,
      SelStd:this.SelStdCtrl,
      FeeTerms:this.TermCtrl,
      Amount:this.AmountCtrl,
      DueMonth:this.DueMonthCtrl,
      SelStudent:this.SelStudentCtrl
    });
    curRoute.params.subscribe(prms=>{
      this.Hid=prms["HId"];
      console.log("Head Id:"+this.Hid);
      this.srv.GetAllAcdYears().subscribe(acds=>{
        this.AcdYearDTOArray=acds;
        this.srv.GetAllOrgStandards(this.SelOrg!).subscribe(stnds=>{
          this.StandardDTOArrya=stnds;
          this.srv.GetSelectedFeeHead(this.Hid).subscribe(SelFeeHeads=>{
            if(SelFeeHeads.length>0)
            {
              this.SelHeadName=SelFeeHeads[0].feeHeadName!;
             let NumberOfTerms= SelFeeHeads[0].terms;
             this.TermsArray=Array.from({length: NumberOfTerms}, (_, i) => i + 1);
            }
            this.MonthLstArray=Array.from({length: 12}, (_, i) => i + 1);
            this.UpdateGrid();
          })
        })
      })
    })
  }
  UpdateGrid()
  {
    let SelStn:string=this.SelStdCtrl.value;
    this.srv.GetAllFeeMasters(this.Hid).subscribe(fms=>{
      console.log(fms);
      this.FeeMasterDTOArray=fms.filter(rec=>{
       return rec.stnId!.toUpperCase()==SelStn!.toUpperCase()
      });
      console.log('this.FeeMasterDTOArray: '+this.FeeMasterDTOArray);
    })
  }
  OnSelectedStandardChange()
  {
    let SelStnId=this.SelStdCtrl.value;
    let SelAcdYearId=this.AcdYearCtrl.value;
    if(SelStnId!=null && SelAcdYearId!=null)
    {
     this.srv.GetAllStudentInfo(SelAcdYearId,SelStnId).subscribe(uinfos=>{
        this.StudentInfoDTOArray=uinfos;
        this.UpdateGrid();
     });
    }
  }
  EditStudentLevelFee(feeId:string)
  {

  }

  DeleteStudentLevelFee(feeId:string)
  {
    this.srv.DeleteFeeMasterFeeRecord(feeId).subscribe(res=>{
      ShowMessageDialog("Record Deleted Successfully");
      this.UpdateGrid();
    })
  }

  AddStudentLevelFee()
  {
    let dto:FeeMasterDTO=new FeeMasterDTO();
    
        dto.fHeadId = this.Hid;
        dto.termNo =  this.TermCtrl.value;
        dto.stnId = this.SelStdCtrl.value;
        dto.mapId = this.SelStudentCtrl.value;
        dto.amount = this.AmountCtrl.value;
        dto.dueMonthNo = this.DueMonthCtrl.value;
        dto.dueDayNo=5;
        dto.acdYearId = this.AcdYearCtrl.value
        dto.addMode = AddFeeMasterActionEnum.STUDENT_LEVEL;
        this.srv.AddFeeMasterRecord(dto).subscribe(res=>{
          ShowMessageDialog("Success In Adding Record");
          this.UpdateGrid();
        });
       }
}
