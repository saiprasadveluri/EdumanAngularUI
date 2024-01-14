import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { AcdYearDTO } from '../app-models';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DbAccessServiceService } from '../db-access-service.service';

@Component({
  selector: 'app-acd-year-manage',
  templateUrl: './acd-year-manage.component.html',
  styleUrls: ['./acd-year-manage.component.css']
})
export class AcdYearManageComponent implements OnInit,AfterViewInit {
  FrmGroup:FormGroup|undefined;
  AcdYearDTOArray:AcdYearDTO[]=[];
  newAcdYear:FormControl|undefined=new FormControl('',Validators.required)
  constructor(private elementRef:ElementRef,private CurRoute:ActivatedRoute, private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService) { 
  this.FrmGroup=fb.group(
    {
      'newAcdYear':this.newAcdYear
    }
  )
  }

  ngAfterViewInit() {
    this.UpdateGrid();
  }

  ngOnInit(): void {
    
  }

  OnEdit(itm:any):void
  {
    
  }
  OnDelete(AcdId:string)
  {
    console.log(AcdId);
    this.srv.DeleteAcdYear(AcdId).subscribe(ret=>{
      this.UpdateGrid();
    });
  }

  AddRecord()
  {
   let NewAcdYearText= this.FrmGroup?.controls["newAcdYear"].value;
   let inp=new AcdYearDTO();
   inp.acdText=NewAcdYearText;
    this.srv.AddAcdYear(inp).subscribe(yr=>{
      this.UpdateGrid();
    });
  }

  UpdateGrid()
  {
    this.srv.GetAllAcdYears().subscribe(yrs=>{
      this.AcdYearDTOArray=yrs;
    });
  }
}
