import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';
import { AcdYearDTO, FeeCollectionReceiptDTO, FeeReceiptInfoDTO, StandardDTO } from '../app-models';
import {MatTableModule} from '@angular/material/table'

@Component({
  selector: 'app-fee-receipts',  
  templateUrl: './fee-receipts.component.html',
  styleUrl: './fee-receipts.component.css'
})
export class FeeReceiptsComponent {

  frmGroup:FormGroup;
  frmConcession:FormGroup|undefined;
  AcdYearCtrl:FormControl=new FormControl(['']);
  SelStdCtrl:FormControl=new FormControl(['']);
  StartDateCtrl:FormControl=new FormControl(['']);
  EndDateCtrl:FormControl=new FormControl(['']);
  SelOrg:string|null="";
  AcdYearDTOArray:AcdYearDTO[]=[];
  StandardDTOArrya:StandardDTO[]=[];
  FeeReceiptInfoDTOArray:FeeReceiptInfoDTO[]=[];
  FeeCollectionReceiptDTOObj:FeeCollectionReceiptDTO|undefined;
  displayedColumns: string[]=['ColDate','ChlnNumber','StuRegdNo','Standard','Amount','StuName','	PayType'];
  //dataSource = new MatTableDataSource(this.FeeReceiptInfoDTOArray);
  constructor(private curRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {
    this.SelOrg = localStorage.getItem("SelOrg");
    this.frmGroup=fb.group({      
      AcdYear:this.AcdYearCtrl,
      SelStd:this.SelStdCtrl,
      Startdate:this.StartDateCtrl,
      EndDate:this.EndDateCtrl
    });

    this.srv.GetAllAcdYears().subscribe(acds=>{
      this.AcdYearDTOArray=acds;
      console.log(acds);
      this.srv.GetAllOrgStandards(this.SelOrg!).subscribe(
        stnds=>{
          this.StandardDTOArrya=stnds;
        }
      )
    })
  }
  PopulateReceipts()
  {
    this.srv.GetFeeReceipts(this.AcdYearCtrl.value,this.SelStdCtrl.value,this.StartDateCtrl.value,this.EndDateCtrl.value).subscribe(dto=>{
      this.FeeReceiptInfoDTOArray=dto;
    });
  }
  ShowDetails(colId:string)
  {
    this.srv.GetFeeReceiptDetails(colId).subscribe(res=>{
      this.FeeCollectionReceiptDTOObj=res;
    });
  }
}
