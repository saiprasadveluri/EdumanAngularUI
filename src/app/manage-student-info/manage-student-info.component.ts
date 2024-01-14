import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import { AcdYearDTO, StandardDTO, StudentInfoDTO } from '../app-models';

@Component({
  selector: 'app-manage-student-info',
  templateUrl: './manage-student-info.component.html',
  styleUrls: ['./manage-student-info.component.css']
})
export class ManageStudentInfoComponent implements OnInit {
  AcdYearList:AcdYearDTO[]=[];
  StnList:StandardDTO[]=[];
  StuInfos:StudentInfoDTO[]=[];
  FrmGroup:FormGroup|undefined;
  //Control Instences
  acYearIdctrl:FormControl=new FormControl('');
  stnIdCtrl:FormControl=new FormControl('');
  constructor(private elementRef:ElementRef,private CurRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService) { 
    this.FrmGroup=fb.group({
      acYearId:this.acYearIdctrl,
      stnId: this.stnIdCtrl});
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

  GetStudentList()
  {
   
    var acYearId=this.acYearIdctrl.value;
    var stnId= this.stnIdCtrl.value; 
    this.srv.GetAllStudentInfo(acYearId,stnId).subscribe(res=>{
      this.StuInfos=res;
    })
  }

  EditStudentInfo(stuMapId:string)
  {
  this.route.navigate(['Home/EditStudent',stuMapId]);
  }

}
