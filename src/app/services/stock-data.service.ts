import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

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

  getSentimentBySymbol(sym: string, from: string, to: string) {
    return this.http.get(
      this.API_URL +
        '/stock/insider-sentiment?symbol=' +
        sym +
        '&from=' +
        from +
        '&to=' +
        to +
        '&token=' +
        this.API_KEY
    );
  }
}
