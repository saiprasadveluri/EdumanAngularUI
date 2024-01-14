import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';
import { AcdYearDTO, FeeHeadMasterDTO, FeeMasterDTO, StandardDTO } from '../app-models';
import { AddFeeMasterActionEnum } from '../app-role-enum.enum';
import { ShowMessageDialog } from 'src/site';

@Component({
  selector: 'app-manage-class-fees',  
  templateUrl: './manage-class-fees.component.html',
  styleUrl: './manage-class-fees.component.css'
})
export class ManageClassFeesComponent 
{
  frmGroup:FormGroup;
  AcdYearCtrl:FormControl=new FormControl(['']);
  SelStdCtrl:FormControl=new FormControl(['']);
  TermCtrl:FormControl=new FormControl(['']);
  AmountCtrl:FormControl=new FormControl(['']);
  DueMonthCtrl:FormControl=new FormControl(['']);

  AcdYearDTOArray:AcdYearDTO[]=[];
  StandardDTOArrya:StandardDTO[]=[];
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
      SelStd:this.SelStdCtrl,
      FeeTerms:this.TermCtrl,
      Amount:this.AmountCtrl,
      DueMonth:this.DueMonthCtrl
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
  ngOnInit(): void {

  }

  UpdateGrid()
  {
    this.srv.GetAllFeeMasters(this.Hid).subscribe(fms=>{
      this.FeeMasterDTOArray=fms;
    })
  }
  EditClassLevelFee(feeId:string)
  {

  }

  AddClassLevelFee()
  {
    let dto:FeeMasterDTO=new FeeMasterDTO();
    
        dto.fHeadId = this.Hid;
         dto.termNo =  this.TermCtrl.value;
        dto.stnId = this.SelStdCtrl.value;
                //dto.MapId = itm.MapId;
        dto.amount = this.AmountCtrl.value;
        dto.dueMonthNo = this.DueMonthCtrl.value;
        dto.dueDayNo=5;
        dto.acdYearId = this.AcdYearCtrl.value
        dto.addMode = AddFeeMasterActionEnum.CLASS_LEVEL;
        this.srv.AddFeeMasterRecord(dto).subscribe(res=>{
          ShowMessageDialog("Success In Adding Record");
          this.UpdateGrid();
        });
       }
  
}