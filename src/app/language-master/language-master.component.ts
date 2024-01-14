import { Component, OnInit } from '@angular/core';
import { LanguageMasterDTO } from '../app-models';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';

@Component({
  selector: 'app-language-master',
  templateUrl: './language-master.component.html',
  styleUrls: ['./language-master.component.css']
})
export class LanguageMasterComponent implements OnInit {

  Langs:LanguageMasterDTO[]=[];
  FrmGroup:FormGroup|undefined;
  
  newLangNameCtrl:FormControl|undefined=new FormControl('',Validators.required);

  constructor(private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService ) { 
      this.FrmGroup=this.fb.group({
        newLangName:this.newLangNameCtrl
      });
  }

  ngOnInit(): void {
    this.UpdateGrid();
  }
  UpdateGrid()
  {
    let OrgId=localStorage.getItem("SelOrg");
    this.srv.GetAllLanguages(OrgId!).subscribe(res=>{
      this.Langs=res;
    });
  }
  AddRecord()
  {
    let NewLangNameText= this.FrmGroup?.controls["newLangName"].value;
   let inp=new LanguageMasterDTO();
   let OrgId=localStorage.getItem("SelOrg");
   inp.languageName=NewLangNameText;
   inp.orgId=OrgId!;

    this.srv.AddNewLanguage(inp).subscribe(yr=>{
      this.UpdateGrid();
    });
  }
  OnEdit(rec:LanguageMasterDTO)
  {

  }

  OnDelete(langId:string)
  {
    this.srv.DeleteLangMaster(langId).subscribe(yr=>{
      this.UpdateGrid();
    });
  }

}
