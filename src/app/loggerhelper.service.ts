import { Injectable } from '@angular/core';
import * as logger  from "../../src/site";
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';  
@Injectable({
  providedIn: 'root'
})
export class LoggerhelperService {

  constructor() { }
  ShowMessage(title:string,msg:string)
  {
    logger.ShowMessageDialog(title,msg);
  }
  HideMessage(){
    logger.HideMessageDialog();
  }

  Htmltopdf(divId:string,pdfUniqueName:string)
  {
    var data:HTMLElement|null =document.getElementById(divId);
    alert(data);
    if(data!=null)
    {
      html2canvas(data!).then(canvas =>{  
        // Few necessary setting options  
        let imgWidth = canvas.height/4;
        let imgHeight = canvas.height/5;// * imgWidth / canvas.width;  
        const contentDataURL = canvas.toDataURL('image/png');
        let pdf = new jspdf.jsPDF('l', 'px', 'a4'); // A4 size page of PDF  
        let position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);  
        var ret=pdf.save(pdfUniqueName); // Generated PDF 
        console.log(ret);  
      });
    }
  }

}
