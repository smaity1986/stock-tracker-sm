import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Stocks } from '../models/stocks.model';
import { SentimentDetails } from '../models/sentimentDetails.model';
import { Quotes } from '../models/quotes.model';

@Injectable({
  providedIn: 'root',
})
export class StockDataService {
  API_URL = environment.API_URL;
  API_KEY = environment.API_KEY;

  constructor(private http: HttpClient) {}

  getStockBySymbol(sym: string) {
    let searchCriteria = new HttpParams();
    searchCriteria = searchCriteria.append('q', sym);
    searchCriteria = searchCriteria.append('token', this.API_KEY);
    return this.http.get<Stocks>(this.API_URL + '/search', {
      params: searchCriteria,
    });
  }

  getQuoteBySymbol(sym: string) {
    let searchCriteria = new HttpParams();
    searchCriteria = searchCriteria.append('symbol', sym);
    searchCriteria = searchCriteria.append('token', this.API_KEY);
    return this.http.get<Quotes>(this.API_URL + '/quote', {
      params: searchCriteria,
    });
  }

  getSentimentBySymbol(sym: string, from: string, to: string) {
    let searchCriteria = new HttpParams();
    searchCriteria = searchCriteria.append('symbol', sym);
    searchCriteria = searchCriteria.append('from', from);
    searchCriteria = searchCriteria.append('to', to);
    searchCriteria = searchCriteria.append('token', this.API_KEY);
    return this.http.get<SentimentDetails>(
      this.API_URL + '/stock/insider-sentiment',
      {
        params: searchCriteria,
      }
    );
  }
}
