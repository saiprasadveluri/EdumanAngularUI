import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DbAccessServiceService } from '../db-access-service.service';

@Component({
  selector: 'app-site-admin-home',
  templateUrl: './site-admin-home.component.html',
  styleUrls: ['./site-admin-home.component.css']
})
export class SiteAdminHomeComponent implements OnInit {

  constructor(private route:Router,private fb:FormBuilder,private srv:DbAccessServiceService )
  { 


  }

  ngOnInit(): void {
  }
  ManageOrgs()
  {
    this.route.navigate(['/Organization']);
  }
  AddOrgs()
  {
    this.route.navigate(['/AddOrganization']);
  }

  AddAcdYears()
  {
    this.route.navigate(['/AcdYearManage']);
  }
}
