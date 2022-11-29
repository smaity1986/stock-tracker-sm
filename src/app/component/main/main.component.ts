import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Quotes } from '../../models/quotes.model';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  listData: Array<Object> = [];
  isLoaded: boolean = false;
  showLoader: boolean = false;
  stockArr: Array<Object> = [];
  stockSymbol: Array<String> = [];
  constructor(private stockDataService: StockDataService) {}

  ngOnInit() {
    this.showLoader = true;
    this.listData = [];
    let stockArr = localStorage.getItem('stockArr');
    stockArr = JSON.parse(stockArr);
    Object.assign(this.listData, stockArr);

    this.stockSymbol = [];
    let stockSym = localStorage.getItem('searchSymbol');
    stockSym = JSON.parse(stockSym);
    Object.assign(this.stockSymbol, stockSym);
    this.showLoader = false;
    this.isLoaded = true;
  }

  searchData(searchVal: string) {
    this.showLoader = true;
    this.stockDataService
      .getStockBySymbol(searchVal)
      .pipe(
        finalize(() => {
          this.showLoader = false;
        })
      )
      .subscribe({
        error: (err) => {},
        next: (d) => {
          var selectedRec = {};
          if (d['count'] > 0) {
            d['result'].map((v: object, k: number) => {
              if (v['displaySymbol'] == searchVal) {
                selectedRec = v;
                return;
              }
            });

            if (Object.keys(selectedRec).length === 0) {
              selectedRec = d['result'][0];
            }
            this.stockDataService.getQuoteBySymbol(searchVal).subscribe((d) => {
              this.rearrangeData(selectedRec, d);
            });
          }
        },
        complete: () => {},
      });
  }

  rearrangeData(symboldata: object, quotedata: Quotes) {
    let finalDataSet = {};
    finalDataSet = symboldata;
    if (quotedata['c']) {
      finalDataSet['current_price'] = quotedata['c'];
    }
    if (quotedata['dp']) {
      finalDataSet['change_today'] = quotedata['dp'];
      finalDataSet['stock_sign'] = quotedata['dp'] > 0 ? 'up' : 'down';
    }
    if (quotedata['o']) {
      finalDataSet['opening_price'] = quotedata['o'];
    }
    if (quotedata['h']) {
      finalDataSet['high_price'] = quotedata['h'];
    }

    var symbol = symboldata['displaySymbol'];
    if (!this.checkIfExists(symbol)) {
      this.listData.push(finalDataSet);
      localStorage.setItem('stockArr', JSON.stringify(this.listData));
      this.stockSymbol.push(symbol);
      localStorage.setItem('searchSymbol', JSON.stringify(this.stockSymbol));
    }
    this.isLoaded = true;
  }

  checkIfExists(symbol: string) {
    var isMatched = false;
    let stockArr = localStorage.getItem('stockArr');
    if (!stockArr) {
      this.stockArr = [];
      return isMatched;
    }

    JSON.parse(stockArr).map((v: object, k: number) => {
      if (v['displaySymbol'] == symbol) {
        isMatched = true;
        return;
      }
    });

    return isMatched;
  }

  clearMainData(symbol: string) {
    this.listData.map((v, k) => {
      if (v['displaySymbol'] == symbol) {
        this.listData.splice(k, 1);
        return;
      }
    });

    this.stockSymbol.map((v: string, k: number) => {
      if (v == symbol) {
        this.stockSymbol.splice(k, 1);
        return;
      }
    });
  }
}
