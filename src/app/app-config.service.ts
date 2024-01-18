import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;
  constructor(private http: HttpClient) { 
    
  }

  get apiBaseUrl() : string {
    return this.appConfig.apiBaseUrl;
  }

  loadAppConfig()
  {
    let appSettingFilePath="";
    if(isDevMode())
    {
      appSettingFilePath="./assets/app-settings.json";
    }
    else
    {
      appSettingFilePath="./assets/app-settings.production.json";
    }
    
    this.http.get(appSettingFilePath).subscribe(cfg=>{
      this.appConfig=cfg;
      console.log(cfg);
    })
  }
}
