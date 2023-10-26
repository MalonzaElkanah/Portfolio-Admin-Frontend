import { Component, OnInit } from '@angular/core';

import {
  Keyword,
  Pricing,
  PricingList,
  PricingError
} from '../prices';
import { PricingService } from '../prices.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {

  priceList: PricingList | undefined;

  constructor(
    private _pricingService: PricingService
  ) { }

  ngOnInit () {
    this._pricingService.getPricingList().subscribe((prices: PricingList)=>{
      this.priceList = prices;
    });
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
