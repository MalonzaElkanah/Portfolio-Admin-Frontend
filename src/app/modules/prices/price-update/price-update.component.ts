import { Component, OnInit } from '@angular/core';
import { FormArray, FormRecord, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from '@angular/router';

import {
  Keyword,
  KeywordList,
  Pricing,
  PricingList,
  PricingError
} from '../prices';
import { PricingService } from '../prices.service';

@Component({
  selector: 'app-price-update',
  templateUrl: './price-update.component.html',
  styleUrls: ['./price-update.component.css']
})
export class PriceUpdateComponent  implements OnInit {
  pricing!: Pricing;

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
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this._route.data.subscribe(data => {
      this.pricing = data['pricing'];
    });
  }

  ngOnInit(){

    if (this.pricing.keywords) {
      let keywords = this.pricing.keywords;

      this.keywordForm.removeAt(0);

      for (let keyword of keywords) {
        this.keywordForm.push(
          new FormRecord({
            name: new FormControl(keyword.name ?? ''),
            status: new FormControl(keyword.status ?? '')
          })
        );
      }

    }

    this.pricingForm = new FormRecord({
      name: new FormControl(this.pricing.name, [Validators.required]),
      description: new FormControl(this.pricing.description, [Validators.required]),
      price: new FormControl(this.pricing.price, [Validators.required]),
      keywords: this.keywordForm
    });

  }

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
    let keywords = this.pricing.keywords;
    let formArray = this.pricingForm.get("keywords") as FormArray;

    if (keywords) {
      if (index < keywords.length ?? index ) {
      
        let name = keywords[index]?.name ?? '';



        this._pricingService.deletePricingKeyword(
          this.pricing?.id ?? 0,
          keywords[index]?.id ?? 0
        ).subscribe(()=>{
          formArray.removeAt(index);
          alert("keyword Deleted");

        },err =>{
          console.log(err);

          alert("Deleting Keyword Failed.");
        });

        this._pricingService.getPricingKeywordList(this.pricing?.id ?? 0).subscribe(
          (keywords: KeywordList) => {
            if (keywords?.results){
              this.pricing.keywords = keywords.results
            }
          }
        );
      } else {
        formArray.removeAt(index);
        alert("Keyword Deleted");
      }
    } else {
      formArray.removeAt(index);
      alert("Keyword Deleted");
    }
  
  }

  removePrice() {
    let deleteConfirm = confirm("DELETE '"+this.pricing.name+"' pricing? Click OK to confirm.");
    if (deleteConfirm) {
      this._pricingService.deletePricing(this.pricing?.id ?? 0).subscribe(() => {

        alert("Delete '"+this.pricing.name+"' Success!");
        console.log("Delete '"+this.pricing.name+"' Success!");
        this._router.navigate([`/pricing`]);

      },(error: any) => {
        console.log("Delete '"+this.pricing.name+"' Failed");
        console.log(error);
        alert("Delete '"+this.pricing.name+"' Failed!");
      }

      )
      
    } else {
      console.log("delete of '"+this.pricing.name+"' Canceled!");
    }
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

    this._pricingService.updatePricing(this.pricing?.id ?? 0, pricing).subscribe(
      (pricing: Pricing) => {
        alert("Price Updated");
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
        alert("Updating Price Failed");
      }
    )
  }

}
