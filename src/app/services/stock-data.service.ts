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

  headers = new HttpHeaders().set('X-Finnhub-Token', this.API_KEY);

  constructor(private http: HttpClient) {}

  getStockBySymbol(sym: string) {
    return this.http.get(this.SYMBOL_SEARCH_URL + 'q=' + sym, {
      headers: this.headers,
    });
  }
}
