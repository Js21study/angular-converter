import { Component, OnInit } from '@angular/core';
import { ConvertationService } from 'src/app/services/convertation.service';

@Component({
  selector: 'app-convert',
  templateUrl: './convert.component.html',
  styleUrls: ['./convert.component.css'],
})
export class ConvertComponent implements OnInit {
  constructor(public convertationService: ConvertationService) {}

  fromCurrency = 'USD';
  toCurrency = 'UAH';
  fromPrice = 0;
  toPrice = 0;

  options: string[] = ['UAH', 'USD', 'EUR', 'PLN'];

  ngOnInit(): void {
    this.fromPrice = this.convertationService.items.conversion_rates['USD'];
    this.toPrice = this.convertationService.items.conversion_rates['UAH'];
  }

  onChangeFromPrice = (e: number) => {
    const result =
      (e / this.convertationService.items.conversion_rates[this.fromCurrency]) *
      this.convertationService.items.conversion_rates[this.toCurrency];
    this.fromPrice = e;
    this.toPrice = Number(result.toFixed(3));
  };

  onChangeToPrice = (e: number) => {
    const result =
      (this.convertationService.items.conversion_rates[this.fromCurrency] /
        this.convertationService.items.conversion_rates[this.toCurrency]) *
      e;
    this.fromPrice = Number(result.toFixed(3));
    this.toPrice = e;
  };

  onChangeFromSelect = (e: string, n: number) => {
    this.fromCurrency = e;
    this.onChangeFromPrice(n);
  };

  onChangeToSelect = (e: string, n: number) => {
    this.toCurrency = e;
    this.onChangeToPrice(n);
  };
}
