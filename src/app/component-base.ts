import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { DbAccessServiceService } from "./db-access-service.service";

export class ComponentBase {
    constructor(public route:Router,public fb:FormBuilder,public srv:DbAccessServiceService) { 

    }
}
