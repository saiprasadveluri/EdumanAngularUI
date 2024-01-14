import { Component, ElementRef, OnInit } from '@angular/core';
import { AcdYearDTO, AddStudentInfoDTO, LanguageMasterDTO, StandardDTO, StdSubMapDTO, StudentLanguageDetailsEntry } from '../app-models';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';


@Component({
  selector: 'app-add-student-info',
  templateUrl: './add-student-info.component.html',
  styleUrls: ['./add-student-info.component.css']
})
export class AddStudentInfoComponent implements OnInit {
 NumberOfLangs:number=0;
  AcdYearList:AcdYearDTO[]=[];
  StnList:StandardDTO[]=[];
  AllLangList:LanguageMasterDTO[]=[];
  langCtrlArray:any[]=[];
  FormArray=new FormArray([]);
  FrmGroup:FormGroup|undefined;
  //Control Instences
  acYearIdctrl:FormControl=new FormControl('');
  stnIdCtrl:FormControl=new FormControl('');
  regdNoCtrl:FormControl=new FormControl('');
  fNameCtrl:FormControl=new FormControl('');
  mNameCtl:FormControl=new FormControl('');
  lNameCtrl:FormControl=new FormControl('');
  dOBirthCtrl:FormControl=new FormControl('');
  dOAdmissionCtrl:FormControl=new FormControl('');
  resAddressCtrl:FormControl=new FormControl('');
  fatherNameCtrl:FormControl=new FormControl('');
  motherNameCtrl:FormControl=new FormControl('');
  fatherMobileCtrl:FormControl=new FormControl('');
  genderCtrl:FormControl=new FormControl('');
  bloodGroupCtrl:FormControl=new FormControl('');
  parentEmailCtrl:FormControl=new FormControl('');
  aadharNoCtrl:FormControl=new FormControl('');
  religionCtrl:FormControl=new FormControl('');
  castCtrl:FormControl=new FormControl('');
  schoolAdmNoCtrl:FormControl=new FormControl('');
  isActiveCtrl:FormControl=new FormControl('');

  
  //End of Contorl Instences
  constructor(private elementRef:ElementRef,private CurRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService) { 
    this.FrmGroup=fb.group({
      acYearId:this.acYearIdctrl,
      stnId: this.stnIdCtrl,
      regdNo:this.regdNoCtrl,
      fName:this.fNameCtrl,
      mName:this.mNameCtl,
      lName:this.lNameCtrl,
      dOBirth:this.dOBirthCtrl,
      resAddress:this.resAddressCtrl,
      fatherName:this.fatherNameCtrl,
      motherName:this.motherNameCtrl,
      fatherMobile:this.fatherMobileCtrl,
      gender:this.genderCtrl,
      bloodGroup:this.bloodGroupCtrl,
      parentEmail:this.parentEmailCtrl,
      aadharNo:this.aadharNoCtrl,
      cast:this.castCtrl,
      schoolAdmNo:this.schoolAdmNoCtrl,
      isActive:this.isActiveCtrl,
      dOAdmission:this.dOAdmissionCtrl   
    });
    
  }
  

  ngOnInit(): void {
    let selOrg=localStorage.getItem("SelOrg");
    this.srv.GetAllAcdYears().subscribe(res=>{
      this.AcdYearList=res;
      this.srv.GetAllOrgStandards(selOrg!).subscribe(std=>{
        this.StnList=std;  
      })
    });
  }
  onStandardSel(stdId:string)
  {
    let selOrg=localStorage.getItem("SelOrg");
    
    this.srv.PopulateStdSubMaps(stdId).subscribe(res=>{
      
      let Langs:StdSubMapDTO[]=res.filter(curStd=>{
        console.log(curStd);
        if(curStd.isLanguage!=undefined)
        {
          if(curStd.isLanguage==1)
          {
            return true;
          }
        }
        return false;
      });
      this.NumberOfLangs=Langs.length;
      alert(this.NumberOfLangs);
      if(this.NumberOfLangs>0)
      {
        this.langCtrlArray=[];
        this.langCtrlArray=new Array(this.NumberOfLangs);

        for(var i=0;i<this.NumberOfLangs;++i)
        {
          this.langCtrlArray[i]=new FormControl(['']);
          this.FrmGroup?.addControl('lang_'+i,this.langCtrlArray[i]);
        }
        this.srv.GetAllLanguages(selOrg!).subscribe(allLangs=>{          
          this.AllLangList=allLangs;
        })
      }
    });
  }
  AddStudent()
  {
    
      //console.log('Language '+ i + "  : "+this.FrmGroup?.controls['lang_'+i].value);
      let StuInfo:AddStudentInfoDTO=new AddStudentInfoDTO();
      let OrgId=localStorage.getItem("SelOrg");
      StuInfo.orgId=OrgId!;
      StuInfo.acYearId=this.acYearIdctrl.value;
      StuInfo.stnId= this.stnIdCtrl.value;
      StuInfo.regdNo=this.regdNoCtrl.value;
      StuInfo.fName=this.fNameCtrl.value;
      StuInfo. mName=this.mNameCtl.value;
      StuInfo.lName=this.lNameCtrl.value;
      StuInfo.dOBirth=this.dOBirthCtrl.value;
      StuInfo.resAddress=this.resAddressCtrl.value;
      StuInfo.fatherName=this.fatherNameCtrl.value;
      StuInfo.motherName=this.motherNameCtrl.value;
      StuInfo.fatherMobile=this.fatherMobileCtrl.value;
      StuInfo.gender=this.genderCtrl.value;
      StuInfo.bloodGroup=this.bloodGroupCtrl.value;
      StuInfo.parentEmail=this.parentEmailCtrl.value;
      StuInfo.aadharNo=this.aadharNoCtrl.value;
      StuInfo.cast=this.castCtrl.value;
      StuInfo.schoolAdmNo=this.schoolAdmNoCtrl.value;
      StuInfo.isActive=this.isActiveCtrl.value==true?1:0;
      StuInfo.dOAdmission=this.dOAdmissionCtrl.value;
      var SLentry:StudentLanguageDetailsEntry[]=[];
      for(var i=0;i<this.NumberOfLangs;++i)
      {
          let CurEntry=new StudentLanguageDetailsEntry();
          CurEntry.ordinalNumber=i+1;
          CurEntry.langId= this.FrmGroup?.controls['lang_'+i].value;
          SLentry.push(CurEntry);
      }
      StuInfo.stuLangs=SLentry;
      this.srv.AddStudentInfo(StuInfo).subscribe(res=>{
        alert("Success");
      });

  }

}
