import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';
import { AcdYearDTO, ChalanListDTO, StandardDTO, StudentInfoDTO } from '../app-models';
import { ChalanInfoVM, ChalanVM } from '../view-models';

@Component({
  selector: 'app-show-chalans',
  templateUrl: './show-chalans.component.html',
  styleUrl: './show-chalans.component.css'
})
export class ShowChalansComponent {
  frmGroup:FormGroup;
  SelOrg:string|null;
  AcdYearCtrl:FormControl=new FormControl(['']);
  SelStdCtrl:FormControl=new FormControl(['']);
  SelStudentCtrl:FormControl=new FormControl(['']);

  AcdYearDTOArray:AcdYearDTO[]=[];
  StandardDTOArrya:StandardDTO[]=[];  
  StudentInfoDTOArray:StudentInfoDTO[]=[];
  ChalanInfoList:ChalanListDTO[]=[];
  data:ChalanVM|undefined;
  TodayDate:Date=new Date();
  CurChlnNum:string="";
  constructor(private curRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {
    this.SelOrg = localStorage.getItem("SelOrg");
    this.frmGroup=fb.group({      
      AcdYear:this.AcdYearCtrl,
      SelStd:this.SelStdCtrl,
      SelStudent:this.SelStudentCtrl
    });
    this.srv.GetAllAcdYears().subscribe(res=>{
      this.AcdYearDTOArray=res;
      this.srv.GetAllOrgStandards(this.SelOrg!).subscribe(stds=>{
        this.StandardDTOArrya=stds;
      })
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
     });
    }
  }
  ShowChalans()
  {
    var SelStdMapId=this.SelStudentCtrl.value;
    this.srv.GetStudentChalanList(SelStdMapId).subscribe(chls=>{
      this.ChalanInfoList=chls;
    })
  }
  ShowChalanLines(chlnId:string,CurChlnNum:string)
  {
    /*this.CurChlnNum=CurChlnNum;
    this.srv.GetChalanDetails(chlnId).subscribe(ResObj=>{
          this.data= new ChalanVM();
          this.data!.regdNo = ResObj.regdNo;
          this.data!.name = ResObj.name;
          this.data!.stndardname = ResObj.stndardname;
          this.data!.chlnNum = ResObj.chlnNum;
          
          ResObj.info.map(obj=>{
            let chlInfo:ChalanInfoVM=new ChalanInfoVM();
            chlInfo.hN = obj.hn;
            chlInfo.termNo=obj.termNo;
            chlInfo.totAmt=obj.totAmt;
            chlInfo.paid = obj.paid;
            chlInfo.due = obj.totAmt - obj.paid
            this.data!.TotalDue+=chlInfo.due;
            this.data!.info.push(chlInfo);
          })
    });*/
    this.route.navigate(['/Home/ShowChalanLines',chlnId]);
  }
  /*SendtoPrint(divId:string)
  {
    alert(divId);
    this.logger.Htmltopdf(divId,this.CurChlnNum);
  }*/
}
