import { Component, OnInit } from '@angular/core';
import { FormGroup, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import {
    Service,
    ServiceList,
    ServiceError
} from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-update',
  templateUrl: './service-update.component.html',
  styleUrls: ['./service-update.component.css']
})
export class ServiceUpdateComponent implements OnInit {
  service!: Service;

  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  serviceForm: FormRecord =  new FormRecord({
    dummy_field: new FormControl()
  });

  serviceError: ServiceError = {
    name: [''],
    description: [''],
    logo: ['']
  }

  constructor(
    private _serviceService: ServiceService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe((data) => {
      this.service = data["service"];
    });

  }

  ngOnInit(){
    this.serviceForm = new FormRecord({
      name: new FormControl(this.service.name, [Validators.required]),
      description: new FormControl(this.service.description, [Validators.required]),
      logo: new FormControl(this.service.logo, [Validators.required])
      
    });

  }

  submitServiceForm() {
    console.log("SERVICE DATA SUBMITTED!!");
    console.log(this.serviceForm.value);

    let service: Service = {
      name: this.serviceForm.value["name"],
      description: this.serviceForm.value["description"],
      logo: this.serviceForm.value["logo"]
    }

    this._serviceService.updateService(this.service?.id ?? 0, service).subscribe(
      (service: Service) => {
        alert("Service Updated.");
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
        alert("Updating Service Failed.");
      }
    )
  }

}
