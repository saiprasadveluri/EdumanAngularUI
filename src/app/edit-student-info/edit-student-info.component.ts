import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import * as base64 from "byte-base64";
import { AddStudentLanguageMapDTO, LanguageMasterDTO, StdSubMapDTO, StuStdMapDTO, StudentLangMapDTO } from '../app-models';
@Component({
  selector: 'app-edit-student-info',
  templateUrl: './edit-student-info.component.html',
  styleUrls: ['./edit-student-info.component.css']
})
export class EditStudentInfoComponent implements OnInit {
   StudentLangMaps:StudentLangMapDTO[]=[];
   StudentMapId:string|undefined;
   StuImgBase64String:string|undefined;
   StuImgMimeType:string="";
   FrmGroup:FormGroup=new FormGroup({});
   StuImgCtrl:FormControl=new FormControl(['']);
   FatherImgCtrl:FormControl=new FormControl(['']);
   MotherImgCtrl:FormControl=new FormControl(['']);
   StuImgFile:File|undefined;


   LangFrmGroup:FormGroup=new FormGroup({});
   LangOrdnalNumberCtrl:FormControl=new FormControl(['']);
   AvailableLanguagesCtrl:FormControl=new FormControl(['']);

   StuStnMapObj:StuStdMapDTO|undefined;
   StdLangSubs:StdSubMapDTO[]|undefined;
   AllLanguages:LanguageMasterDTO[]|undefined;

   SelLangId:string="";
   SelOrdinal:number=0;
  constructor(private curRoute:ActivatedRoute, private elementRef:ElementRef,private CurRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService) 
  {
    this.FrmGroup=this.fb.group({
      stuImage:this.StuImgCtrl,
      FatherImg:this.FatherImgCtrl,
      MotherImg:this.MotherImgCtrl
    });
    this.LangFrmGroup=this.fb.group({
      LangOrdnalNumber:this.LangOrdnalNumberCtrl,
      AvailableLanguages:this.AvailableLanguagesCtrl
    });
    this.curRoute.params.subscribe(pr=>{
      this.StudentMapId=pr["stuMapId"];      
    })
  }

  ngOnInit(): void {
    this.srv.GetAllStuStdAcdMapData(this.StudentMapId!).subscribe(mapData=>{
      this.StuStnMapObj=mapData;
    });
  }

  UploadImages(evt:any)
  {
    this.srv.UploadFile(this.StuImgFile!,this.StuStnMapObj!.studentId!,1).subscribe(res=>{
      alert("Success In Uploading Student Image");
     });   
  }

  onStuFileSelected(event:any)
  {
    this.StuImgFile = event.target.files[0];
    console.log(this.StuImgFile);
  }

  onFatherFileSelected(event:any)
  {

  }

  onMotherFileSelected(event:any)
  {

  }

  ImageTabClick()
  {
    this.srv.GetAllStuStdAcdMapData(this.StudentMapId!).subscribe(mapData=>{
      this.srv.DownlaodFile(mapData.studentId!,1).subscribe(res=>{
        console.log(res);
        this.StuImgBase64String= res.data;     
        this.StuImgMimeType=res.mimeType!;
      })
    });   
  }

  LanguagesTabClick()
  {
    this.PrepareLanguageTabView();
  }

  PrepareLanguageTabView()
  {
    this.srv.GetAllStudentMappedLanguages(this.StudentMapId!).subscribe(res=>{
      console.log(res);
      this.StudentLangMaps= res.map(obj=>{
       let mapObj:StudentLangMapDTO =new StudentLangMapDTO(); 
       mapObj.mapId=obj.mapId;
       mapObj.languageId=obj.languageId;
       mapObj.languageName=obj.languageName;
       mapObj.langOrdinal=obj.langOrdinal;
       return mapObj;
      });  
      console.log(this.StudentLangMaps);
    this.srv.PopulateStdSubMaps(this.StuStnMapObj?.standardId!).subscribe(res=>{
       this.StdLangSubs= res.filter(sub=>sub.isLanguage);
       let OrgId:string|null=localStorage.getItem("SelOrg");
       this.srv.GetAllLanguages(OrgId!).subscribe(allLangEntry=>{
            this.AllLanguages=allLangEntry;
       })
    });
  });
  }
  SelectLang(evt:any)
  {
    this.SelectLang=evt.target.value;
  }

  SelectOrdinal(evt:any)
  {
    this.SelOrdinal=evt.target.value;
  }

  onLangSubmit()
  {
    var SelectedLangId=this.LangFrmGroup.controls["AvailableLanguages"].value;
    var SelectedOrdinalNumber=this.LangFrmGroup.controls["LangOrdnalNumber"].value;
    alert(SelectedLangId);
    alert(SelectedOrdinalNumber);
    let Obj:AddStudentLanguageMapDTO= new AddStudentLanguageMapDTO();
    Obj.stuMapId=this.StudentMapId;
    Obj.languageId=SelectedLangId;
    Obj.langOrdinal=SelectedOrdinalNumber;
    this.srv.AddStudentlanguageMap(Obj).subscribe(res=>{
      this.PrepareLanguageTabView();
    });
  }

  RemoveLangMap(langMapId:string)
  {
    this.srv.RemoveStudentlanguageMap(langMapId).subscribe(res=>{
      this.PrepareLanguageTabView();
    });
  }
}
