import { AddFeeMasterActionEnum } from "./app-role-enum.enum";

export  class UserDTO
    {
        public UserId:any;
        public UserName:string=""; 
        public Email:string="";
        public UserRole:string="";
        public accessToken:string="";
        public IsGoogleAccount:number=0;
    }
    
    export class LoginDTO
    {
        public UserID:string="";
        public Password:string="";
        public SelOrgId:string|undefined;
        public GenToken:boolean=false;
    }
    export class NewUserInfo
    {
        public  id:string="";
        public orgId:string="";
        public OrgCode:string="";
        public orgName:string="";
        public  UserId:string="";
        public  Password:string="";
        public  Name:string="";
        public  MobileNo :string="";
        public  Status:string="";
        public  roleId:string="";
        public roleVal:number=0;
        public roleString:string|undefined;
        public  jwtTokenString:string="";
        public userOrgMapDTOs:UserOrgMapDTO[]=[];
    }

    export class OrganizationDTO
    {
        public orgId:string|undefined; 

        public   orgCode:string="";

        public   orgName:string=""; 

        public   orgAddress:string=""; 

        public   orgPOC:string="";

        public   orgEmail:string="";

        public   orgMobile:string="";

    }

    export class UserInfoDTO
    {
        public id:string|undefined;
        public orgId:string|undefined;
        public  roleId:string="";
        public  roleVal:number=0;
        public mapId:string|undefined;
        public roleName:string="";
        public name:string="";
        public userId:string="" ;
        public password:string="";
        public  mobNo:string="";
        public  emailid:string="";
    }

    export class RoleMasterDTO
    {   
        public roleID:string="";
        public roleVal:number=0;
        public  roleName:string="";
    }

    export class UserOrgMapDTO
    {
        
        public mapId:string|undefined;  
        
        public userId:string|undefined; 
        
        public orgId:string|undefined;  
        
        public roleId :string|undefined;  

        public orgName :string|undefined;  

        public roleName :string|undefined;
        public RoleValue:number=0;
    }

    export class AcdYearDTO
    {
        public  acdId:string|undefined;
        public  acdText:string|undefined;

    }

    export class StandardDTO
    {   
        public stdId:string|undefined;
        public orgId:string|undefined;
        public stdName:string|undefined;
    }

    export class SubjectDTO
    {
        public subId:string|undefined;
        public orgId:string|undefined;
        public subjectName:string|undefined;
        public subCode:string|undefined;
        public isLanguage:number|undefined;
        public langOrdinal:number|undefined;
    }

    export class StdSubMapDTO
    { 
        public mapId :string|undefined;

        public subId :string|undefined;
        public  stdId:string|undefined;

        public subName :string|undefined;
        public  subCode :string|undefined;
        public isLanguage:number|undefined;
        public langOrdinal:number|undefined;
    }

    export class LanguageMasterDTO
    {
        public langId:string|undefined;

        public orgId :string|undefined;

        public languageName :string|undefined;
    }

    export class AddStudentInfoDTO
    {
        public   acYearId:string|undefined
        public   stnId:string|undefined
        public   stuId:string|undefined


        public regdNo:string|undefined


        public fName:string|undefined

        public mName:string|undefined
        public lName:string|undefined



        public dOBirth:string|undefined


        public  dOAdmission:string|undefined

        public resAddress:string|undefined
        public fatherName:string|undefined
        public motherName:string|undefined
        public fatherMobile:string|undefined
        public gender:string|undefined
        public bloodGroup:string|undefined
        public parentEmail:string|undefined
        public aadharNo:string|undefined
        public religion:string|undefined
        public cast:string|undefined
        public schoolAdmNo:string|undefined
        public isActive:number|undefined

        public   loginUID:string|undefined

        public   orgId:string|undefined
        public  stuLangs :StudentLanguageDetailsEntry[]=[];
    }


    export class StudentInfoDTO
    {
        public   mapId:string|undefined;
        public   acYearId:string|undefined
        public   stnId:string|undefined
        public   stuId:string|undefined
        public   regdNo:string|undefined

        public fName:string|undefined

        public mName:string|undefined
        public lName:string|undefined



        public dOBirth:string|undefined


        public  dOAdmission:string|undefined

        public resAddress:string|undefined
        public fatherName:string|undefined
        public motherName:string|undefined
        public fatherMobile:string|undefined
        public gender:string|undefined
        public bloodGroup:string|undefined
        public parentEmail:string|undefined
        public aadharNo:string|undefined
        public religion:string|undefined
        public cast:string|undefined
        public schoolAdmNo:string|undefined
        public isActive:number|undefined

        public   loginUID:string|undefined

        public   orgId:string|undefined
        //public  stuLangs :StudentLanguageDetailsEntry[]=[];
    }


    export class StudentLanguageDetailsEntry
    {
        public   langId :string|undefined
        public ordinalNumber :number=0
    }

    export class FileManagerDTO
    {
        public  data :any|undefined
        public name:string|undefined;
        public mimeType:string|undefined;
    }
    export class FileManagerInputDTO
    {
        public ReqDataIdentifer:number=0;
        public UniqIdentifer:string="";
        public InpFile:any|undefined;
    }

    export class StuStdMapDTO
    { 
        public mapId:string|undefined;
        public studentName:string = ""
        public studentId:string|undefined; 
        public standardId:string|undefined; 
    }

    export class StudentLangMapDTO
    {
        public mapId:string|undefined;       
        public studentId:string|undefined; 
        public langOrdinal:number=0;
        public languageId:string|undefined;
        public languageName:string|undefined;
    }

    export class AddStudentLanguageMapDTO
    {
        public langOrdinal:number=0
        public stuMapId:string|undefined;
        public languageId:string|undefined;
    }

    export class FeeHeadMasterDTO
    {
        public feeHeadId:string|undefined;
        public  orgId:string|undefined;
        public feeHeadName :string|undefined;
        public feeType :number=0;
        public  terms :number=0;
    }
    
    export class PayheadDTO
    {
        public PHID :string|undefined;
        public OrgId :string|undefined;
        public Name :string|undefined;
        public HeadType:number=0;
    }

    export class FeeMasterDTO
    {
        public feeId:string|undefined;


        public fHeadId :string|undefined;


        public termNo :number=0;

        public stnId :string|undefined;
        public stnText:string="";
        public mapId:string|undefined;
        public studentDispName:string="";

        public amount:number=0;


        public acdYearId:string|undefined;
        public acdYearText:string="";


        public dueDayNo:number=1;

        public dueMonthNo:number=1;

        public addMode:number=0;
      
    }

    export class FeeConcessionDTO
    {
        public conId:string|undefined;
        public feeId:string|undefined;
        public mapId:string|undefined;
        public amt:number=0;
        public reason:string="";
        public concessionType:number=0;
    }

    export class StudentFeeInfoDTO
    {
        public  mapId:string|undefined;
        public regdNo:string|undefined;
        public name:string|undefined;
        public stndardname:string|undefined;
        public lines:StudentFeeInfoLineItem[]=[];
    }
    export class StudentFeeInfoLineItem
    {
        public fid:string|undefined;
        public hn:string|undefined;
        public termNo:number=0;
        public totAmt:number=0;
        public  conAmout:number=0;
    }

    export class FeeConcessionViewDTO
    {
        public  conId :string|undefined;
        public  feeHeadName :string|undefined;
        public  amt:number =0
        public  reason: string|undefined;
        public  termNo:number=0;
        public  concessionType:number=0;
        public concessionTypeText:string|undefined;
    }

    export class ChalanDTO
    {
        public chlnNum :string|undefined;
        public stdId:string|undefined;
        public acdYear :string|undefined;
        public mapId:string|undefined;
        public regdNo:string|undefined;
        public name :string|undefined;
        public stndardname:string|undefined;
        public info:ChalanInfoDTO[]=[];
    }

    export class ChalanInfoDTO
    {
        public fid:string|undefined;
        public hn:string|undefined;
        public termNo:number=0;
        public totAmt:number=0;
        public concession:number=0;
        public paid:number=0;
        public due :number=0;
        public dueMon  :number=0;
    }

    export class StudentChalansInfoDTO
    {
        public stuMapId:string|undefined;
        public items:StudentChalansInfoLineItemDTO[]=[];
    }

    export class StudentChalansInfoLineItemDTO
    {
        public fId:string|undefined;
        public amt:number=0;
    }
    
    export class ChalanListDTO
    {
        public chlId:string|undefined;
        public chlDate:Date|undefined;
        public chlnNum :string|undefined;
    }


    export class FeeChalanCollectionDTO
    {
        public chlnId:string|undefined;

        public payType:number=0;
        public colDate:Date|undefined;
        public notes:string|undefined;

    }

    export class FeeCollectionReceiptDTO
    {
        public chlnNumber:string="";
        public successFalg:number=0;
        public regdNo:string|undefined;
        public name :string|undefined;
        public payType:number=0;
        public paydate:Date|undefined;
        public notes:string|undefined;
        public lines:FeeCollectionReceiptLineDTO[]=[];
    }

    export class FeeCollectionReceiptLineDTO
    {
        public feeHeadName:string|undefined;
        public termNo:number=0;
        public amt:number=0;
    }

    export class FeeReceiptInfoDTO
    {
        public feeColId :string|undefined;
        public colDate:Date|undefined;
        public stuRegdNo:string|undefined;
        public stuName :string|undefined;
        public standard :string|undefined;
        public payType:number=0;
        public amount:number=0;
        public chlnNumber:string|undefined;
    }

    