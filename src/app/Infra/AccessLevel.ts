import { NewUserInfo } from "../app-models";

export class AccessLevelCheck{
    AccessMap:AccessMapInfo[]=[]
    constructor()
    {
        this.AccessMap.push(new AccessMapInfo("/Home/Enquiries",[3,4]));
        this.AccessMap.push(new AccessMapInfo("/Home/Organization",[4]));
    }
    CheckAccess(url:string):boolean
    {    
        let UsrInfoString:string|null=localStorage.getItem("UserInfo");
        if(UsrInfoString!=null)
        {
            let orgId=localStorage.getItem("SelctedOrgId");
            if(orgId!=null)
            {
                let userInfoArr:NewUserInfo[];
                userInfoArr=JSON.parse(UsrInfoString) as NewUserInfo[];
                console.log(userInfoArr);
                
                let ReqRoleArr=this.AccessMap.filter(acc=>{
                    return acc.url==url && (userInfoArr.filter(uinfo=>{
                        return uinfo.orgId==orgId && acc.ReqRole.includes(uinfo.roleVal);
                    }).length>0)
                 });
                 console.log(ReqRoleArr);
            return ReqRoleArr.length>0
            }
            else
            {
               console.log("ORG is Not set");
            }
            
        }
        else
        {
            console.log("No User Info Array");
        }

        

        return false;
    }
}

export class AccessMapInfo
{
   constructor(public url:string,public ReqRole:number[])
   {

   }
}