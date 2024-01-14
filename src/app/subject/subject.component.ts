import { Component, OnInit } from '@angular/core';
import { StandardDTO, SubjectDTO } from '../app-models';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  OrgSubjectdArray:SubjectDTO[]=[];
  FrmGroup:FormGroup|undefined;
  
  subNameCtrl:FormControl=new FormControl('',[Validators.required]);
  subCodeCtrl:FormControl=new FormControl('',[Validators.required]);
  isLanguageCtrl:FormControl=new FormControl('');
  langOrdinalCtrl:FormControl=new FormControl('');
  constructor(public route:Router,public fb:FormBuilder,public srv:DbAccessServiceService) { 
    this.FrmGroup= fb.group({
      subName:this.subNameCtrl,
      subCode:this.subCodeCtrl,
      isLanguage:this.isLanguageCtrl,
      langOrdinal:this.langOrdinalCtrl
    });
  }
  ngOnInit(): void {
    this.UpdateGrid();
  }

  UpdateGrid()
  {
    let SelOrg=localStorage.getItem('SelOrg');
    this.srv.GetAllOrgSubjects(SelOrg!).subscribe(stds=>{
      this.OrgSubjectdArray=stds;
    });
  }

  AddRecord()
  {
    let SelOrg=localStorage.getItem('SelOrg');
    let NewSubName=this.subNameCtrl.value;
    let NewSubCode=this.subCodeCtrl.value;
    let NewSub:SubjectDTO= new SubjectDTO();
    NewSub.orgId=SelOrg!;
    NewSub.subjectName=NewSubName;
    NewSub.subCode=NewSubCode;
    console.log(this.isLanguageCtrl.value);
    NewSub.isLanguage=this.isLanguageCtrl.value==true?1:0;
    NewSub.langOrdinal=this.langOrdinalCtrl.value;

    this.srv.AddOrgSubject(NewSub).subscribe(res=>{
        this.UpdateGrid();
    });
  }

  OnEdit(inp:SubjectDTO){

  }
  OnDelete(SubId:string)
  {
    this.srv.DeleteOrgSubject(SubId).subscribe(res=>{
      this.UpdateGrid();
    });
  }

}
