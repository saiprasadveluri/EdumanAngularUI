import { Component, OnInit } from '@angular/core';
import { NewUserInfo } from '../app-models';

@Component({
  selector: 'app-app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css']
})
export class AppHomeComponent implements OnInit {
  CurUsr:NewUserInfo|undefined;
  constructor() { }

  ngOnInit(): void {
    let CurUsrString=localStorage.getItem("UserInfo");
    this.CurUsr=JSON.parse(CurUsrString!);
    console.log(this.CurUsr);
  }

}
