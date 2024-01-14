import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AcdYearDTO, ChalanDTO, StandardDTO, StudentChalansInfoDTO, StudentChalansInfoLineItemDTO, StudentInfoDTO } from '../app-models';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { LoggerhelperService } from '../loggerhelper.service';
import { ChalanInfoVM, ChalanVM } from '../view-models';

@Component({
  selector: 'app-manage-student-challan',
  templateUrl: './manage-student-challan.component.html',
  styleUrl: './manage-student-challan.component.css'
})
export class ManageStudentChallanComponent {
  frmGroup:FormGroup;
  frmChln:FormGroup|undefined;
  AcdYearCtrl:FormControl=new FormControl(['']);
  SelStdCtrl:FormControl=new FormControl(['']);
  SelStudentCtrl:FormControl=new FormControl(['']);
  SelTermsCtrl:FormControl=new FormControl(['']);
  AmountCtrl:FormControl=new FormControl(['']);
  

  AcdYearDTOArray:AcdYearDTO[]=[];
  StandardDTOArrya:StandardDTO[]=[];  
  StudentInfoDTOArray:StudentInfoDTO[]=[];
  CurChalanDTOObj:ChalanDTO|undefined;
  Hid:string="";
  SelOrg:string|null;
  SelHeadName:string="";
  SelStuMapId:string="";
  TermsArray:number[]=[];
  NumberOfTerms:number=12;
  vmObj:ChalanVM|undefined;
  LineSize:number=0;
  sectionGrp:FormGroup|undefined;
  constructor(private curRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService,private logger:LoggerhelperService )
  {
    this.SelOrg = localStorage.getItem("SelOrg");

    this.frmGroup=fb.group({      
      AcdYear:this.AcdYearCtrl,
      SelStd:this.SelStdCtrl,     
      Amount:this.AmountCtrl,      
      SelStudent:this.SelStudentCtrl,
      SelTerms:this.SelTermsCtrl

    });
    this.srv.GetAllAcdYears().subscribe(acds=>{
      this.AcdYearDTOArray=acds;
      this.srv.GetAllOrgStandards(this.SelOrg!).subscribe(stnds=>{
        this.StandardDTOArrya=stnds;
        this.TermsArray=Array.from({length: this.NumberOfTerms}, (_, i) => i + 1);
      })
    })
  }
  ngOnInit(): void {
    this.frmChln=this.fb.group({
      
    });
  }

  OnSelectedStandardChange()
  {
    let SelStnId=this.SelStdCtrl.value;
    let SelAcdYearId=this.AcdYearCtrl.value;
    if(SelStnId!=null && SelAcdYearId!=null)
    {
     this.srv.GetAllStudentInfo(SelAcdYearId,SelStnId).subscribe(uinfos=>{
        this.StudentInfoDTOArray=uinfos;
        //this.UpdateGrid();
     });
    }
  }
  GetStudentChalanInfo()
  {
    let SelStdMapId=this.SelStudentCtrl.value;
    let SelTermsVal=this.SelTermsCtrl.value;
    if(SelStdMapId!=null && SelTermsVal!=null)
    {      
      
      this.srv.GetStudentChalanInfo(SelStdMapId,SelTermsVal).subscribe(chlnDto=>{
        this.CurChalanDTOObj=chlnDto;
        console.log(this.CurChalanDTOObj);
        this.sectionGrp = this.fb.group({
       
        });
        this.frmChln!.addControl('sectionGrp',this.sectionGrp);
        
        this.LineSize=chlnDto.info.length;
        this.vmObj=new ChalanVM();
        this.vmObj.regdNo = chlnDto.regdNo;
        this.vmObj.name = chlnDto.name;
        this.vmObj.stndardname = chlnDto.stndardname;
        this.vmObj.stuMapId= chlnDto.mapId;
      chlnDto.info.map((o,indx)=>{
        var rowGrp = this.fb.group({});
        this.sectionGrp!.addControl('curRow_'+indx,rowGrp);
        let infoObj:ChalanInfoVM=new ChalanInfoVM();
        infoObj.fID = o.fid;
        infoObj.hN = o.hn;
        infoObj.termNo = o.termNo;
        infoObj.totAmt = o.totAmt;
        infoObj.paid = o.paid;
        infoObj.concession=o.concession;
        infoObj.due = o.totAmt - o.paid-o.concession;
        this.vmObj!.info.push(infoObj);
        rowGrp.addControl('Selection',this.fb.control(''));
        /*rowGrp.addControl('HeadName',this.fb.control(o.hn));
        rowGrp.addControl('Term',this.fb.control(o.termNo));
        rowGrp.addControl('TotAmount',this.fb.control(o.totAmt));
        rowGrp.addControl('AvailCon',this.fb.control(o.concession));
        rowGrp.addControl('Paid',this.fb.control(o.paid));
        rowGrp.addControl('due',this.fb.control(o.due));*/
        rowGrp.addControl('Amount',this.fb.control('')); 
      })
      });
    }
  }
  AddStudentChalanInfo()
  {
    var IsItemsSelected:boolean=false;
    var SecGrp=this.frmChln!.controls['sectionGrp'] as FormGroup;
    let dto:StudentChalansInfoDTO=new StudentChalansInfoDTO();
    dto.stuMapId=this.SelStudentCtrl.value;
    for(var i=0;i<this.LineSize;++i)
    {
      let rowGrp=SecGrp.controls['curRow_'+i] as FormGroup;
      let checked=rowGrp.controls['Selection'].value;
      if(checked)
      {
        let itm:StudentChalansInfoLineItemDTO= new StudentChalansInfoLineItemDTO();
        itm.amt=rowGrp.controls['Amount'].value;
        itm.fId=this.CurChalanDTOObj!.info[i].fid;
        alert(itm.amt);
        alert(itm.fId);
        dto.items.push(itm);
        IsItemsSelected=true;
      }
    }
    if(IsItemsSelected==true)
    {
      this.srv.AddStudentChalanInfo(dto).subscribe(res=>{
        console.log(res);
       
        this.logger.ShowMessage("Info","Success...");
        this.route.navigate(['/Home/ShowChalanLines',res.newChlnId]);
      });
    }
    else
    {
      this.logger.ShowMessage("Error","No Items Selected...");
    }
    
  }
}
