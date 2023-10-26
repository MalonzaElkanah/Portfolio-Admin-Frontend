import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';


import {
    Service,
    ServiceList,
    ServiceError
} from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent implements OnInit {
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  serviceForm: FormRecord =  new FormRecord({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required])
  });

  serviceError: ServiceError = {
    name: [''],
    description: [''],
    logo: ['']
  }

  constructor(
    private _serviceService: ServiceService,
    private _router: Router
  ) { }

  ngOnInit(){ }

  submitServiceForm() {
    console.log("SERVICE DATA SUBMITTED!!");
    console.log(this.serviceForm.value);

    let service: Service = {
      name: this.serviceForm.value["name"],
      description: this.serviceForm.value["description"],
      logo: this.serviceForm.value["logo"]
    }

    this._serviceService.createService(service).subscribe((service: Service) => {
      alert("Service Added");
      this._router.navigate([`/services`]);

    },
    (error:any)=>{
      
      console.log(error);
      if (error.status == 400) {
        this.serviceError = error.error;
      }        
      // this.errorMessage = err.error.message;
      this.isFailed = true;
      this.isSuccessful = false;
      alert("Creating New Service Failed");
    })
  }

}
