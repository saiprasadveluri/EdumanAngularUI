import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { OrgSelectionComponent } from './org-selection/org-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DbAccessServiceService } from './db-access-service.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { EnquiriesComponent } from './enquiries/enquiries.component';
import { OrganizationComponent } from './organization/organization.component';
import { EditOrganizationComponent } from './edit-organization/edit-organization.component';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { OrgAdminManageComponent } from './org-admin-manage/org-admin-manage.component';
import { OrgAdminEditComponent } from './org-admin-edit/org-admin-edit.component';

import { ErrorViewComponent } from './error-view/error-view.component';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { AcdYearManageComponent } from './acd-year-manage/acd-year-manage.component';
import { SiteAdminHomeComponent } from './site-admin-home/site-admin-home.component';
import { StandardComponent } from './standard/standard.component';
import { SubjectComponent } from './subject/subject.component';
import { StdSubMapComponent } from './std-sub-map/std-sub-map.component';
import { LanguageMasterComponent } from './language-master/language-master.component';
import { AddStudentInfoComponent } from './add-student-info/add-student-info.component';
import { ManageStudentInfoComponent } from './manage-student-info/manage-student-info.component';
import { EditStudentInfoComponent } from './edit-student-info/edit-student-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoggerhelperService } from './loggerhelper.service';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FeeDefaultersComponent } from './fee-defaulters/fee-defaulters.component';

import { HttpHelper } from './http-helper';
import { AddAuthTokenInterceptor } from './add-auth-token-interceptor';
import { EMPTY, Observable } from 'rxjs';
@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    AppHomeComponent,
    OrgSelectionComponent,
    EnquiriesComponent,
    OrganizationComponent,
    EditOrganizationComponent,
    AddOrganizationComponent,
    OrgAdminManageComponent,
    OrgAdminEditComponent,
    ErrorViewComponent,
    AcdYearManageComponent,
    SiteAdminHomeComponent,
    StandardComponent,
    SubjectComponent,
    StdSubMapComponent,
    LanguageMasterComponent,
    AddStudentInfoComponent,
    ManageStudentInfoComponent,
    EditStudentInfoComponent,
    ManageFeeHeadsComponent,
    ManageClassFeesComponent,
    ManageStudentFeesComponent,
    ManageSchoolFeeComponent,
    FeeConcessionComponent,
    ManageChalanComponent,
    ShowChalansComponent,
    ManageStudentChallanComponent,
    ShowChalanLinesComponent,
    FeeReceiptsComponent,
    FeeDefaultersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule

  ],
  providers: [
    HttpClient,
    {provide:HttpHelper,useClass:HttpHelper,deps:[HttpClient,LoggerhelperService]},
    {provide:DbAccessServiceService,useClass:DbAccessServiceService,deps:[HttpHelper]},
    {provide: APP_BASE_HREF, useValue: '/'},    
    {provide:LoggerhelperService,useClass:LoggerhelperService},
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAuthTokenInterceptor,
      multi: true
    }     
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }


