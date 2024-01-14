import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppHomeComponent } from './app-home/app-home.component';
import { OrgSelectionComponent } from './org-selection/org-selection.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { OrganizationComponent } from './organization/organization.component';
import { AccessGaurdGuard } from './Infra/access-gaurd.guard';
import { EditOrganizationComponent } from './edit-organization/edit-organization.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { OrgAdminManageComponent } from './org-admin-manage/org-admin-manage.component';
import { OrgAdminEditComponent } from './org-admin-edit/org-admin-edit.component';
import { SiteGuardGuard } from './site-guard.guard';
import { AppRoleEnum } from './app-role-enum.enum';
import { ErrorViewComponent } from './error-view/error-view.component';
import { AcdYearManageComponent } from './acd-year-manage/acd-year-manage.component';
import { SiteAdminHomeComponent } from './site-admin-home/site-admin-home.component';
import { StandardComponent } from './standard/standard.component';
import { SubjectComponent } from './subject/subject.component';
import { StdSubMapComponent } from './std-sub-map/std-sub-map.component';
import { LanguageMasterComponent } from './language-master/language-master.component';
import { AddStudentInfoComponent} from './add-student-info/add-student-info.component';
import { ManageStudentInfoComponent } from './manage-student-info/manage-student-info.component';
import { EditStudentInfoComponent } from './edit-student-info/edit-student-info.component';
import { ManageFeeHeadsComponent } from './manage-fee-heads/manage-fee-heads.component';
import { ManageClassFeesComponent } from './manage-class-fees/manage-class-fees.component';
import { ManageStudentFeesComponent } from './manage-student-fees/manage-student-fees.component';
import { ManageSchoolFeeComponent } from './manage-school-fee/manage-school-fee.component';
import { FeeConcessionComponent } from './fee-concession/fee-concession.component';
import { ManageChalanComponent } from './manage-chalan/manage-chalan.component';
import { ShowChalansComponent } from './show-chalans/show-chalans.component';
import { ManageStudentChallanComponent } from './manage-student-challan/manage-student-challan.component';
import { ShowChalanLinesComponent } from './show-chalan-lines/show-chalan-lines.component';
import { FeeReceiptsComponent } from './fee-receipts/fee-receipts.component';
import { FeeDefaultersComponent } from './fee-defaulters/fee-defaulters.component';

const routes: Routes = [
  
  {path:'Login', component:LoginFormComponent},
  {path:'Home', component:AppHomeComponent,
  children:[
    {path:'Enquiries', component:EnquiriesComponent,canActivate:[AccessGaurdGuard]},
    {path:'ManageOrgAdmin',component:OrgAdminManageComponent},
    {path:'OrgAdminEdit/:recid',component:OrgAdminEditComponent},
    {path:'OrgStandard',component:StandardComponent},
    {path:'OrgSubject',component:SubjectComponent},
    {path:'StdSubMap/:recid',component:StdSubMapComponent},
    {path:'Language',component:LanguageMasterComponent},
   
    {path:"AcdYearManage",component:AcdYearManageComponent},
    {path:'AddStudent',component:AddStudentInfoComponent},
    {path:'ManageStudent',component:ManageStudentInfoComponent},
    {path:'EditStudent/:stuMapId',component:EditStudentInfoComponent},
    {path:"ManageFeeHeads",component:ManageFeeHeadsComponent},
    {path:"ManageClassFees/:HId",component:ManageClassFeesComponent},
    {path:"ManageStudentFees/:HId",component:ManageStudentFeesComponent},
    {path:"ManageSchoolFee/:HId",component:ManageSchoolFeeComponent},
    {path:"FeeConcession",component:FeeConcessionComponent},
    {path:"ManageChalan",component:ManageChalanComponent},
    {path:"ShowChalans",component:ShowChalansComponent},
    {path:"ShowChalanLines/:chlnId",component:ShowChalanLinesComponent},
    {path:"ManageStudentChallan",component:ManageStudentChallanComponent},
    {path:"FeeReceipts",component:FeeReceiptsComponent},
    {path:"FeeDefaulters",component:FeeDefaultersComponent}
  ]},  
  {path:"SiteAdminHome",component:SiteAdminHomeComponent,children:[
    {path:'Organization',component:OrganizationComponent,canActivate:[SiteGuardGuard],data:{
      roles: [
        AppRoleEnum.SITE_ADMIN
      ]
    }},
    {path:"EditOrganization/:id",component:EditOrganizationComponent},
    {path:"AddOrganization",component:AddOrganizationComponent},
    
  ]},
  {path:"ErrorView/:msg",component:ErrorViewComponent},
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
