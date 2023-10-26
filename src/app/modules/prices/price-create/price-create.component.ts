import { Component, OnInit } from '@angular/core';
import { FormArray, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import {
  Keyword,
  Pricing,
  PricingList,
  PricingError
} from '../prices';
import { PricingService } from '../prices.service';

@Component({
  selector: 'app-price-create',
  templateUrl: './price-create.component.html',
  styleUrls: ['./price-create.component.css']
})
export class PriceCreateComponent implements OnInit {
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  keywordForm: FormArray = new FormArray([
    new FormRecord({
      name: new FormControl(''),
      status: new FormControl('')
    })
  ]);

  pricingForm: FormRecord =  new FormRecord({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    keywords: this.keywordForm
  });

  pricingError: PricingError = {
    name: [''],
    description: [''],
    price: ['']
  }

  constructor(
    private _pricingService: PricingService,
    private _router: Router
  ) { }

  ngOnInit(){ }

  getKeywordFormRecord(index: number) {
    let formArray = this.pricingForm.get("keywords") as FormArray;
    return formArray.at(index) as FormRecord;
  }

  addKeywordFormRecord() {
    let newFormRecord = new FormRecord({
      name: new FormControl(''),
      status: new FormControl('')
    });

    this.keywordForm.push(newFormRecord);
  }

  deleteKeywordFormRecord(index: number) {
    let formArray = this.pricingForm.get("keywords") as FormArray;
    formArray.removeAt(index);    
  }

  submitPriceForm() {
    console.log("PRICE DATA SUBMITTED!!");
    console.log(this.pricingForm.value);
    console.log(this.keywordForm.value);

    let pricing: Pricing = {
      name: this.pricingForm.value["name"],
      description: this.pricingForm.value["description"],
      price: this.pricingForm.value["price"],
      keywords: this.pricingForm.value["keywords"]
    }

    this._pricingService.createPricing(pricing).subscribe((pricing: Pricing) => {
      alert("Price Added");
      this._router.navigate([`/pricing`]);

    },
    (error:any)=>{
      
      console.log(error);
      if (error.status == 400) {
        this.pricingError = error.error;
      }        
      // this.errorMessage = err.error.message;
      this.isFailed = true;
      this.isSuccessful = false;
      alert("Creating New Price Failed");
    })
  }
}
