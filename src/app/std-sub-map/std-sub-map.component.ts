import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';
import {  StdSubMapDTO,  SubjectDTO } from '../app-models';

@Component({
  selector: 'app-std-sub-map',
  templateUrl: './std-sub-map.component.html',
  styleUrls: ['./std-sub-map.component.css']
})
export class StdSubMapComponent implements OnInit {
  SelStdId:string|undefined;
  ExistingMaps:StdSubMapDTO[]=[];
  AvailSubs:SubjectDTO[]=[];
  form: FormGroup|undefined;
  constructor(private CurRoute:ActivatedRoute, public route:Router,public fb:FormBuilder,public srv:DbAccessServiceService) { 
    CurRoute.params.subscribe(prms=>{
      this.SelStdId=prms["recid"];
      this.form = this.fb.group({
        existing: new FormArray([]),
        available:new FormArray([]),
      });
    });
  }

  get existingFormArray() {
    return this.form!.controls['existing'] as FormArray;
  }

  get availableFormArray() {
    return this.form!.controls['available'] as FormArray;
  }

  ngOnInit(): void {
    this.PopulateGrids();
  }

  PopulateGrids()
  {
    this.PopulateMaps();
  }

  PopulateMaps()
  {    
    let SelOrg=localStorage.getItem('SelOrg');
    
    this.existingFormArray.clear();
    this.availableFormArray.clear();

    this.srv.PopulateStdSubMaps(this.SelStdId!).subscribe(res=>{
      this.ExistingMaps=res;
      
      this.srv.GetAllOrgSubjects(SelOrg!).subscribe(subs=>{
        
        this.AvailSubs= subs.filter(function(itm){ 
               
          if(res.find(itm2=>{
            console.log(itm.subId+ " / "+itm2.subId);
            return itm.subId?.toUpperCase()==itm2.subId?.toUpperCase();
          })==undefined)
          {
            return true;
          }
          else
          {
            return false;
          }
        });
        
        res.forEach((sub)=>{this.existingFormArray.push(new FormControl(false))});
        this.AvailSubs.forEach((sub)=>{this.availableFormArray.push(new FormControl(false))});
       
      }      
      );
    })
  }

  RemoveMap()
  {
    const NeedtoRemove = this.form!.value.existing.map((checked: any, i: number) => checked ? this.ExistingMaps[i].mapId : null)
      .filter((v:string) => v !== null);
      let MapIds="";
      MapIds=NeedtoRemove.join(",");
    console.log(MapIds);
    this.srv.DeleteStdSubMaps(MapIds).subscribe(res=>{
      this.PopulateGrids();
    })
  }

  AddMap()
  {
    const NeedtoAdd = this.form!.value.available.map((checked:any, i:number) => checked ? this.AvailSubs[i] : null)
    .filter((v:SubjectDTO) => v != null).map((itm:SubjectDTO)=>{
      let obj=new StdSubMapDTO();
      obj.stdId=this.SelStdId;
      obj.subId=itm.subId;
      return obj;
    });
    
  this.srv.AddStdSubMaps(NeedtoAdd).subscribe(res=>{
    this.PopulateGrids();
  });
  }

}
