import { Injectable } from '@angular/core';
import { Observable, delay, retry, tap, catchError, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IConvert } from '../models/convertItems';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class ConvertationService {
  constructor(private http: HttpClient, private errorService: ErrorService) {}

  items: IConvert = {
    result: '',
    documentation: '',
    terms_of_use: '',
    time_last_update_unix: 0,
    time_last_update_utc: '',
    time_next_update_unix: 0,
    time_next_update_utc: '',
    base_code: '',
    conversion_rates: {
      ['']: 0,
    },
  };

  itemsforEur: IConvert = {
    result: '',
    documentation: '',
    terms_of_use: '',
    time_last_update_unix: 0,
    time_last_update_utc: '',
    time_next_update_unix: 0,
    time_next_update_utc: '',
    base_code: '',
    conversion_rates: {
      ['']: 0,
    },
  };

  getAll(): Observable<IConvert> {
    return this.http
      .get<IConvert>(
        'https://v6.exchangerate-api.com/v6/bada389b22f98c36c86cc6bb/latest/USD'
      )
      .pipe(
        delay(200),
        retry(2),
        tap((prod) => {
          this.items = prod;
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  getAllEur(): Observable<IConvert> {
    return this.http
      .get<IConvert>(
        'https://v6.exchangerate-api.com/v6/bada389b22f98c36c86cc6bb/latest/EUR'
      )
      .pipe(
        delay(200),
        retry(2),
        tap((prod) => {
          this.itemsforEur = prod;
        }),
        catchError(this.errorHandler.bind(this))
      );
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorService.handle(error.message);
    return throwError(() => error.message);
  }
}
