import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-view',
  templateUrl: './error-view.component.html',
  styleUrls: ['./error-view.component.css']
})
export class ErrorViewComponent implements OnInit,AfterViewInit {
  public errMessage:string|null="";
  constructor(private route:ActivatedRoute) {
    route.params.subscribe(pr=>{
      this.errMessage=pr["msg"];
      console.log(this.errMessage);
    });
   }

  ngOnInit(): void {
    
  }

  ngAfterViewInit()
  {
    
  }
}
