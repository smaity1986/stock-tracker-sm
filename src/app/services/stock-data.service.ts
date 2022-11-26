import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  API_URL = environment.API_URL;
  API_KEY = environment.API_KEY;

  constructor(private http: HttpClient) {}

  getStockBySymbol(sym: string) {
    return this.http.get(
      this.API_URL + '/search?q=' + sym + '&token=' + this.API_KEY
    );
  }

  getQuoteBySymbol(sym: string) {
    return this.http.get(
      this.API_URL + '/quote?symbol=' + sym + '&token=' + this.API_KEY
    );
  }

  getSentimentBySymbol(sym: string) {
    return this.http.get(
      this.API_URL +
        '/stock/insider-sentiment?symbol=' +
        sym +
        '&from=2022-01-01&to=2022-12-31&token=' +
        this.API_KEY
    );
  }
}
