import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';
import { AcdYearDTO, FeeHeadMasterDTO, FeeMasterDTO, StandardDTO } from '../app-models';
import { AddFeeMasterActionEnum } from '../app-role-enum.enum';
import { ShowMessageDialog } from 'src/site';

@Component({
  selector: 'app-manage-school-fee',
 
  templateUrl: './manage-school-fee.component.html',
  styleUrl: './manage-school-fee.component.css'
})
export class ManageSchoolFeeComponent {
  frmGroup:FormGroup;
  AcdYearCtrl:FormControl=new FormControl(['']);  
  TermCtrl:FormControl=new FormControl(['']);
  AmountCtrl:FormControl=new FormControl(['']);
  DueMonthCtrl:FormControl=new FormControl(['']);

  AcdYearDTOArray:AcdYearDTO[]=[];  
  TermsArray:number[]=[];
  MonthLstArray:number[]=[];
  FeeMasterDTOArray:FeeMasterDTO[]=[];
  Hid:string="";
  SelOrg:string|null;
  SelHeadName:string="";
  constructor(private curRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {   
    this.SelOrg = localStorage.getItem("SelOrg");

    this.frmGroup=fb.group({      
      AcdYear:this.AcdYearCtrl,      
      FeeTerms:this.TermCtrl,
      Amount:this.AmountCtrl,
      DueMonth:this.DueMonthCtrl
    });
    curRoute.params.subscribe(prms=>{
      this.Hid=prms["HId"];
      console.log("Head Id:"+this.Hid);
      this.srv.GetAllAcdYears().subscribe(acds=>{
        this.AcdYearDTOArray=acds;
           //this.StandardDTOArrya=stnds;
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
  }
  UpdateGrid()
  {
    this.srv.GetAllFeeMasters(this.Hid).subscribe(fms=>{
      this.FeeMasterDTOArray=fms;
    })
  }
  AddSchoollFee()
  {
    let dto:FeeMasterDTO=new FeeMasterDTO();
    
        dto.fHeadId = this.Hid;
         dto.termNo =  this.TermCtrl.value;
        //dto.stnId = this.SelStdCtrl.value;
                //dto.MapId = itm.MapId;
        dto.amount = this.AmountCtrl.value;
        dto.dueMonthNo = this.DueMonthCtrl.value;
        dto.dueDayNo=5;
        dto.acdYearId = this.AcdYearCtrl.value
        dto.addMode = AddFeeMasterActionEnum.SCHOOL_LEVEL;
        this.srv.AddFeeMasterRecord(dto).subscribe(res=>{
          ShowMessageDialog("Success In Adding Record");
          this.UpdateGrid();
        });
       }
       EditSchoolLevelFee(feeId:string)
       {

       }
       DeleteSchoolLevelFee(feeId:string)
       {
        this.srv.DeleteFeeMasterFeeRecord(feeId).subscribe(res=>{
          ShowMessageDialog("Record Deleted Successfully");
          this.UpdateGrid();});
       }
}
