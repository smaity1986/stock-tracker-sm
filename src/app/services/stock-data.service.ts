import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  SYMBOL_SEARCH_URL = environment.SYMBOL_SEARCH_URL;
  STOCK_DATA_URL = environment.STOCK_DATA_URL;
  API_KEY = environment.API_KEY;

  // headers = new HttpHeaders()
  //   .set('X-Finnhub-Token', this.API_KEY)
  //   .set('Access-Control-Allow-Origin', '*');

  constructor(private http: HttpClient) {}

  getStockBySymbol(sym: string) {
    return this.http.get(
      this.SYMBOL_SEARCH_URL + '?q=' + sym + '&token=' + this.API_KEY
    );
  }

  getQuoteBySymbol(sym: string) {
    return this.http.get(
      this.SYMBOL_SEARCH_URL + '?quote=' + sym + '&token=' + this.API_KEY
    );
  }

  getSentimentBySymbol(sym: string) {
    return this.http.get(
      this.SYMBOL_SEARCH_URL + '?quote=' + sym + '&token=' + this.API_KEY
    );
  }
}
