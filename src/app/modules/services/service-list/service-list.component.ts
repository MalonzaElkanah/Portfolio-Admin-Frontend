import { 
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import {
    Service,
    ServiceList,
    ServiceError
} from '../service';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit {

  serviceList!: ServiceList;

  constructor(
    private _serviceService: ServiceService,
    private _router: Router
  ) {

  }

  ngOnInit(){
    this._serviceService.getServiceList().subscribe((services: ServiceList) => {
      this.serviceList = services;
    });
  }

  removeService(service: Service) {
    let deleteConfirm = confirm("DELETE '"+service.name+"' service? Click OK to confirm.");
    if (deleteConfirm) {
      this._serviceService.deleteService(service?.id ?? 0).subscribe(() => {

        alert("Delete '"+service.name+"' Success!");
        console.log("Delete '"+service.name+"' Success!");
        this._serviceService.getServiceList().subscribe((services: ServiceList) => {
          this.serviceList = services;
        });

      },(error: any) => {
        console.log("Delete '"+service.name+"' Failed");
        console.log(error);
        alert("Delete '"+service.name+"' Failed!");
      }

      )
      
    } else {
      console.log("delete of '"+service.name+"' Canceled!");
    }
  }

  slugify(str: string): string {
    return str.toLowerCase(
      ).trim(
      ).replace(
        /[^\w\s-]/g,
        ''
      ).replace(
        /[\s_-]+/g,
        '-'
      ).replace(
        /^-+|-+$/g,
        ''
      );
  }

  binarify(int: number): string {
    return btoa(int.toString())
  }

}
