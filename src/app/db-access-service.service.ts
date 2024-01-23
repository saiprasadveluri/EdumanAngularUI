import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHelper } from './http-helper';
import { AcdYearDTO, AddStudentInfoDTO, AddStudentLanguageMapDTO, ChalanDTO, ChalanListDTO, FeeChalanCollectionDTO, FeeCollectionReceiptDTO, FeeConcessionDTO, FeeConcessionViewDTO, FeeDefaulterInfoDTO, FeeHeadMasterDTO, FeeMasterDTO, FeeReceiptInfoDTO, FileManagerDTO, FileManagerInputDTO, LanguageMasterDTO, NewUserInfo, OrganizationDTO, PayheadDTO, RoleMasterDTO, StandardDTO, StdSubMapDTO, StuStdMapDTO, StudentChalansInfoDTO, StudentFeeInfoDTO, StudentInfoDTO, StudentLangMapDTO, SubjectDTO, UserDTO, UserInfoDTO, UserOrgMapDTO } from './app-models';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { LoggerhelperService } from './loggerhelper.service';
import { AddFeeMasterActionEnum, FetchTermFeeTypeEnum } from './app-role-enum.enum';

@Injectable({
  providedIn: 'root'
})
export class DbAccessServiceService {
  //httpHelper:HttpHelper;
 // accessToken:string|null;
  constructor(private httpHelper:HttpHelper)//private http:HttpClient,private logger:LoggerhelperService,private CfgSrv:AppConfigService ) 
  {
    //this.httpHelper=new HttpHelper(http,logger,CfgSrv);
   }

   VerifyCreds(Un:string,pwd:string):Observable<NewUserInfo>
   {
    let body:any={UserID:Un,Password:pwd,GenToken:false};
    return this.httpHelper.HttpPost("Login",body); 
   }
   GetJWTToken(Un:string,pwd:string,SelOrgId:string|undefined):Observable<NewUserInfo>
  {
    let body:any={UserID:Un,Password:pwd,GenToken:true,SelOrgId:SelOrgId};
    let hdr:HttpHeaders= new HttpHeaders();
    return this.httpHelper.HttpPost("Login",body); 
  }

  GetAllOrgList():Observable<OrganizationDTO[]>
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
    
    return this.httpHelper.HttpGet<OrganizationDTO[]>("Organization",undefined);
  }

  GetSelectedOrganization(OrgId:string):Observable<OrganizationDTO[]>
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
    let prms:HttpParams= new HttpParams().append('Guid',OrgId);
    return this.httpHelper.HttpGet<OrganizationDTO[]>("Organization",prms);
  }

  UpdateOrganization(inp:OrganizationDTO)
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
    let body:any;
    body=inp;
    return this.httpHelper.HttpPut<OrganizationDTO>("Organization",body);
  }

  AddeOrganization(inp:OrganizationDTO)
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
    let body:any;
    body=inp;
    return this.httpHelper.HttpPost<OrganizationDTO>("Organization",body);
  }

  DeleteOrganizaion(recId:string)
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
    return this.httpHelper.HttpDelete("Organization",'chks',recId);
  }


  DeleteRecord(recId:string,ctrlName:string)
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
    this.httpHelper.HttpDelete(ctrlName,'chkes',recId)
  }

  GetAllRoles()
  {
    //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
    return this.httpHelper.HttpGet<RoleMasterDTO[]>("RoleMaster",undefined);
  }

AddOrgUser(inp:UserInfoDTO)
 {
  //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
  let body:any;
  body=inp;
  return this.httpHelper.HttpPost<UserInfoDTO>("UserInfo",body);
 } 

 GetAllOrgUserList(orgId:string)
 {
  //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
  //let prms:HttpParams= new HttpParams().append('orgId',orgId);
  return this.httpHelper.HttpGet<UserInfoDTO[]>("UserInfo/"+orgId,undefined);
 }

 DeleteOrgUser(mapId:string):Observable<string>
 {
  //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
  return this.httpHelper.HttpDelete<string>("UserInfo",'recId',mapId);
 }

 UpdateOrgUser(inp:UserInfoDTO)
 {
  //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
  let body:any;
  body=inp;
  return this.httpHelper.HttpPut<string>("UserInfo",body);
 }

 GetUserOrganizationsInfo(UserId:string|undefined):Observable<UserOrgMapDTO[]>
 {
  //let hdr:HttpHeaders= new HttpHeaders().append("Authorization","Bearer "+this.accessToken).append("contentType","application/json");
  //let prms:HttpParams= new HttpParams().append('orgId',orgId);
  return this.httpHelper.HttpGet<UserOrgMapDTO[]>("UserOrgMap/"+UserId,undefined);
 }

 GetAllAcdYears():Observable<AcdYearDTO[]>
 {
  return this.httpHelper.HttpGet<AcdYearDTO[]>("AcdYear");
 }
 AddAcdYear(inp:AcdYearDTO)
 {
  return this.httpHelper.HttpPost("AcdYear",inp);
 }

 DeleteAcdYear(id:string)
 {
  return this.httpHelper.HttpDelete("AcdYear","chks",id);
 }

 GetAllOrgStandards(OrgId:string):Observable<StandardDTO[]>
 {
  let prms:HttpParams= new HttpParams().append('OrgId',OrgId);
  return this.httpHelper.HttpGet<StandardDTO[]>("Standard",prms);
 }

 AddOrgStandard(inp:StandardDTO)
 {
  return this.httpHelper.HttpPost('Standard',inp);
 }
 DeleteOrgStandard(stdId:string)
 {
  return this.httpHelper.HttpDelete('Standard','chks',stdId);
 }



 GetAllOrgSubjects(OrgId:string):Observable<SubjectDTO[]>
 {
  let prms:HttpParams= new HttpParams().append('OrgId',OrgId);
  return this.httpHelper.HttpGet<SubjectDTO[]>("Subject",prms);
 }

 AddOrgSubject(inp:SubjectDTO)
 {
  return this.httpHelper.HttpPost('Subject',inp);
 }
 DeleteOrgSubject(stdId:string)
 {
  return this.httpHelper.HttpDelete('Subject','chks',stdId);
 }

 PopulateStdSubMaps(StdId:string)
 {
  let prms:HttpParams= new HttpParams().append('StdId',StdId);
  return this.httpHelper.HttpGet<StdSubMapDTO[]>("StdSubMap",prms);
 }

 DeleteStdSubMaps(mapIds:string)
 {
  return this.httpHelper.HttpDelete('StdSubMap','chks',mapIds);
 }

 AddStdSubMaps(SubData:any)
 {  
  return this.httpHelper.HttpPost('StdSubMap',SubData);
 }

 GetAllLanguages(OrgId:string|undefined)
 {
  let prms:HttpParams= new HttpParams().append('OrgId',OrgId!);
  return this.httpHelper.HttpGet<LanguageMasterDTO[]>(
    "LanguageMaster",prms
  );
 }

 AddNewLanguage(inp:LanguageMasterDTO)
 {
  return this.httpHelper.HttpPost("LanguageMaster",inp);
 }

 DeleteLangMaster(langIds:string)
 {
  return this.httpHelper.HttpDelete('LanguageMaster','chks',langIds);
 }

 AddStudentInfo(inp:AddStudentInfoDTO)
 {
  console.log(inp);
  return this.httpHelper.HttpPost("StudentInfo",inp);
 }

 GetAllStudentInfo(AyearId:string,StdId:string):Observable<StudentInfoDTO[]>
 {
  let prms:HttpParams= new HttpParams().append('AyearId',AyearId!).append('StdId',StdId);
  return this.httpHelper.HttpGet("StudentInfo",prms);
 }

 UploadFile(fl:File,UniqIdentifer:string,ReqDataIdentifer:number):Observable<string>
 {
  var inpFormData=new FormData();
  inpFormData.append("InpFile",fl);
  inpFormData.append("ReqDataIdentifer",String(ReqDataIdentifer));
  inpFormData.append("UniqIdentifer",UniqIdentifer);
  this.httpHelper.AppendHeader('Content-Disposition', 'mulipart/form-data');
  return this.httpHelper.HttpPost<string>("FileManager",inpFormData);
 }
 DownlaodFile(UniqIdentifer:string,ReqDataIdentifer:number):Observable<FileManagerDTO>
 {
  let prms:HttpParams= new HttpParams()
  .append("ReqDataIdentifer",String(ReqDataIdentifer))
  .append("UniqIdentifer",UniqIdentifer);
  return this.httpHelper.HttpGet("FileManager",prms);
 }
public GetAllStuStdAcdMapData(MapId:string):Observable<StuStdMapDTO>
{
  let prms:HttpParams= new HttpParams().append('MapId',MapId!);
  return this.httpHelper.HttpGet("StuStnAcdMap",prms);
}

public GetAllStudentMappedLanguages(mapId:string):Observable<StudentLangMapDTO[]>
{
  let prms:HttpParams= new HttpParams().append('StuStnAcdMapId',mapId);
  return this.httpHelper.HttpGet("StudentLanguageMap",prms);
}

public AddStudentlanguageMap(inp:AddStudentLanguageMapDTO)
{
  return this.httpHelper.HttpPost("StudentLanguageMap",inp);
}

public RemoveStudentlanguageMap(mapId:string):Observable<string>
{
  return this.httpHelper.HttpDelete("StudentLanguageMap","chks",mapId);
}

public GetAllFeeHeads(OrgId:string):Observable<FeeHeadMasterDTO[]>
{
  let prms:HttpParams= new HttpParams().append('OrgId',OrgId!);
  return this.httpHelper.HttpGet("FeeHead",prms);
}

public GetSelectedFeeHead(HeadId:string):Observable<FeeHeadMasterDTO[]>
{
  let prms:HttpParams= new HttpParams().append('HeadId',HeadId);
  return this.httpHelper.HttpGet("FeeHead",prms);
}

public AddNewFeeHead(head:FeeHeadMasterDTO):Observable<string>
{
  return this.httpHelper.HttpPost("FeeHead",head);
}

public DeleteFeeHead(headId:string):Observable<string>
{
  return this.httpHelper.HttpDelete("FeeHead","chks",headId);
}

public GetAllFeeMasters(id:string):Observable<FeeMasterDTO[]>
{
  let prms:HttpParams= new HttpParams().append('Id',id).append("GetType",FetchTermFeeTypeEnum.GETBY_HEADID)
  return this.httpHelper.HttpGet("FeeMaster",prms);
}

public AddFeeMasterRecord(inp:FeeMasterDTO):Observable<FeeMasterDTO>
{
  return this.httpHelper.HttpPost("FeeMaster",inp);
}
public DeleteFeeMasterFeeRecord(id:string):Observable<string>
{
  return this.httpHelper.HttpDelete("FeeMaster","id",id);
}

public GetStudentFeeInfo(mapId:string,termNum:number):Observable<StudentFeeInfoDTO>
{
  let prms:HttpParams= new HttpParams().append('MapId',mapId).append("TermNo",termNum);
  return this.httpHelper.HttpGet("StudentFeeInfo",prms);
}

public AddFeeConcessions(inp:FeeConcessionDTO[]):Observable<string>
{
  
  return this.httpHelper.HttpPost("FeeConcession",inp);
}
public GetStudentFeeConcession(mapId:string):Observable<FeeConcessionViewDTO[]>
{
  let prms:HttpParams= new HttpParams().append('MapId',mapId);
  return this.httpHelper.HttpGet("FeeConcession",prms);
}

public DeleteStudentFeeConcession(conId:string):Observable<string>
{
  return this.httpHelper.HttpDelete("FeeConcession","chk",conId);
}

public GenerateBulkChalan(SelStn:string,AcdId:string,TermNo:number):Observable<ChalanDTO[]>
{
  let prms:HttpParams= new HttpParams().append('StnId',SelStn).append("AcdId",AcdId).append("TermNo",TermNo.toString());
  return this.httpHelper.HttpGet("Chelan",prms);
}

public GetStudentChalanList(stuMapId:string):Observable<ChalanListDTO[]>
{
  let prms:HttpParams= new HttpParams().append('MapId',stuMapId);
  return this.httpHelper.HttpGet<ChalanListDTO[]>("ChalaInfo",prms);
}
public GetChalanDetails(chlId:string):Observable<ChalanDTO>
{
  let prms:HttpParams= new HttpParams().append('ChlnId',chlId);
  return this.httpHelper.HttpGet<ChalanDTO>("ChalanDetails",prms);
}
public GetStudentChalanInfo(stuMapId:string,termNo:number):Observable<ChalanDTO>
{
  let prms:HttpParams= new HttpParams().append('MapId',stuMapId).append("TermNo",termNo);
  return this.httpHelper.HttpGet<ChalanDTO>("StudentChallan",prms);
}

public AddStudentChalanInfo(inp:StudentChalansInfoDTO):Observable<any>
{
  return this.httpHelper.HttpPost("StudentChallan",inp);
}

public PayChallan(inp:FeeChalanCollectionDTO):Observable<FeeCollectionReceiptDTO>
{
  return this.httpHelper.HttpPost("FeeCollection",inp);
}

public GetFeeReceipts(SelAcdyearId:string, SelStnId:string,StartDate:Date, EndDate:Date):Observable<FeeReceiptInfoDTO[]>
{
  let prms:HttpParams= new HttpParams().append('AcdYear',SelAcdyearId)
  .append("StnId",SelStnId,).append("StartDate",StartDate.toString())
  .append("EndDate",EndDate.toString());
  return this.httpHelper.HttpGet<FeeReceiptInfoDTO[]>("FeeCollectionReceipt",prms);
}

public GetFeeReceiptDetails(ColId:string):Observable<FeeCollectionReceiptDTO>
{
  return this.httpHelper.HttpGet<FeeCollectionReceiptDTO>("FeeCollectionReceipt/"+ColId);
}

public GetDefaultersData(SelStnId:string,SelAcdyearId:string,TermNo:number,OrgId:string):Observable<FeeDefaulterInfoDTO[]>
{
  let prms:HttpParams= new HttpParams().append('AcdYearId',SelAcdyearId)
  .append("StnId",SelStnId,).append("TermNo",TermNo).append("OrgId",OrgId);
  return this.httpHelper.HttpGet<FeeDefaulterInfoDTO[]>("FeeDefaultersData",prms);

}
}