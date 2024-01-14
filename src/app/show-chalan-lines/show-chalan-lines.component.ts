import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';
import { AcdYearDTO, ChalanListDTO, FeeChalanCollectionDTO, FeeCollectionReceiptDTO, StandardDTO, StudentInfoDTO } from '../app-models';
import { ChalanInfoVM, ChalanVM } from '../view-models';
import { PayTypeEnum } from '../app-role-enum.enum';

@Component({
  selector: 'app-show-chalan-lines',  
  templateUrl: './show-chalan-lines.component.html',
  styleUrl: './show-chalan-lines.component.css'
})
export class ShowChalanLinesComponent {
  data:ChalanVM|undefined;
  chalanId:string|undefined;
  CurChlnNum:string|undefined="";
  map: {id: number; name: string}[] = [];
  frmGroup:FormGroup;
  NotesCtrl:FormControl=new FormControl(['']);
  PayTypeCtrl:FormControl=new FormControl(['']);
  ColReceiptData:FeeCollectionReceiptDTO|undefined;
  TodayDate:Date;
  constructor(private curRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {
    this.TodayDate=new Date();
    for(var n in PayTypeEnum) {
      if (typeof PayTypeEnum[n] === 'number') {
          this.map.push({id: <any>PayTypeEnum[n], name: n});
      }
      }
      this.frmGroup=fb.group({      
        notes:this.NotesCtrl,
        payType:this.PayTypeCtrl
      });
    curRoute.params.subscribe(prm=>{
      this.chalanId=prm["chlnId"];
      this.srv.GetChalanDetails(this.chalanId!).subscribe(ResObj=>{
        this.data= new ChalanVM();
        this.data!.regdNo = ResObj.regdNo;
        this.data!.name = ResObj.name;
        this.data!.stndardname = ResObj.stndardname;
        this.data!.chlnNum = ResObj.chlnNum;
        this.CurChlnNum=ResObj.chlnNum;
        
        ResObj.info.map(obj=>{
          let chlInfo:ChalanInfoVM=new ChalanInfoVM();
          chlInfo.fID=obj.fid;
          chlInfo.hN = obj.hn;
          chlInfo.termNo=obj.termNo;
          chlInfo.totAmt=obj.totAmt;
          chlInfo.paid = obj.paid;
          chlInfo.due = obj.totAmt - obj.paid
          this.data!.TotalDue+=chlInfo.due;
          this.data!.info.push(chlInfo);
        })
  });
    });
  }
  PayChalan()
  {
    let feeColDto:FeeChalanCollectionDTO=new FeeChalanCollectionDTO();
    feeColDto.chlnId=this.chalanId;
    feeColDto.notes=this.NotesCtrl.value;
    feeColDto.payType=this.PayTypeCtrl.value;
    feeColDto.colDate=new Date();
    this.srv.PayChallan(feeColDto).subscribe(res=>{
      this.ColReceiptData=res;
      this.logger.ShowMessage("Success","Payment Success");
    });
  }
  SendtoPrint(divId:string)
  {
    alert(divId);
    this.logger.Htmltopdf(divId,this.CurChlnNum!);
  }
}
