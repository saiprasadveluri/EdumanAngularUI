import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from "@angular/common/http";
import {Observable, catchError, of, throwError} from 'rxjs';
import { LoggerhelperService } from "./loggerhelper.service";

//declare function ShowMessageDialog(msg:any):any;
//declare function HideMessageDialog():any;
export class HttpHelper {
    baseAddress:string;

    ComHeader:HttpHeaders|undefined;
    constructor(private http:HttpClient,private logger:LoggerhelperService)
    {
        //this.baseAddress="http://api.bluegreenvsb.in/api/";
        this.baseAddress="http://localhost:5000/API/";
        //this.baseAddress="https://edumanapi.azurewebsites.net/API/"
        
    }

    public AppendHeader(name:string,value:string)
    {
        this.ComHeader=this.ComHeader?.set(name,value);
    }

    PrepareHeaders()
    {
        this.ComHeader=new HttpHeaders();
        let accessToken=localStorage.getItem("AuthToken");
        if(accessToken!=undefined)
        {
            this.ComHeader= this.ComHeader.append("Authorization","Bearer "+accessToken);
           
        }
        console.log("Access Token "+accessToken);        
    }

    HttpGet<T>(ctrlName:string,prms?:HttpParams):Observable<T>{
         this.PrepareHeaders();
         return this.http.get<T>(this.baseAddress+ctrlName,{
            headers:this.ComHeader,
            params:prms,          
        }).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
            //this.errorMessage = error.message;
            //alert('There was an error!: '+ error.message);
            this.logger.ShowMessage("Error In accessing the Server:",error.message);
            // after handling error, return a new observable 
            // that doesn't emit any values and completes
            return of();
        }));
        
    }

    HttpPost<T>(ctrlName:string,body:any):Observable<T>{
        this.PrepareHeaders();
        return this.http.post<T>(this.baseAddress+ctrlName,
            body,
            {
            headers:this.ComHeader,                   
            }
        ).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
            //this.errorMessage = error.message;
            //alert('There was an error!: '+ error.message);
            this.logger.ShowMessage("Error In accessing the Server:",error.message);
            // after handling error, return a new observable 
            // that doesn't emit any values and completes
            return of();
        }));
    }

    HttpPut<T>(ctrlName:string,body:any,hdrs?:HttpHeaders):Observable<T>{
        this.PrepareHeaders();
        var frmData:FormData=new FormData();
        
        return this.http.put<T>(this.baseAddress+ctrlName,
            body,
            {
            headers:this.ComHeader,                   
            }
        ).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
            //this.errorMessage = error.message;
            //alert('There was an error!: '+ error.message);
            this.logger.ShowMessage("Error In accessing the Server:",error.message);
            // after handling error, return a new observable 
            // that doesn't emit any values and completes
            return of();
        }));
    }

    HttpDelete<T>(ctrlName:string,qparam:string,recId:string):Observable<T>
    {
        this.PrepareHeaders();
        let url=this.baseAddress+ctrlName+"?"+qparam+"="+recId;
        return this.http.delete<T>(url,            
            {
                headers:this.ComHeader,            
            },
            ).pipe(catchError((error: any, caught: Observable<any>): Observable<any> => {
                //this.errorMessage = error.message;
                //alert('There was an error!: '+ error.message);
                this.logger.ShowMessage("Error In accessing the Server:",error.message);
                // after handling error, return a new observable 
                // that doesn't emit any values and completes
                return of();
            }));
    }
}
