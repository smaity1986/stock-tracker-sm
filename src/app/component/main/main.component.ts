import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ListStockData } from '../../models/listStockData.model';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  listData: Array<ListStockData> = [];
  isLoaded: boolean = false;
  showLoader: boolean = false;
  stockArr: Array<ListStockData> = [];
  stockSymbol: Array<String> = [];
  constructor(private stockDataService: StockDataService) {}

  ngOnInit() {
    this.showLoader = true;
    let stockArr = localStorage.getItem('stockArr');
    stockArr = JSON.parse(stockArr);
    Object.assign(this.listData, stockArr);

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
        next: (d) => {
          var symboldata = {};
          if (d['count'] > 0) {
            d['result'].map((v: object, k: number) => {
              if (v['displaySymbol'] == searchVal) {
                symboldata = v;
                return;
              }
            });

            if (Object.keys(symboldata).length === 0) {
              symboldata = d['result'][0];
            }
            this.stockDataService
              .getQuoteBySymbol(searchVal)
              .subscribe((quotedata) => {
                let finalDataSet: ListStockData = {
                  change_today: symboldata['change_today'],
                  current_price: symboldata['current_price'],
                  description: symboldata['description'],
                  displaySymbol: symboldata['displaySymbol'],
                  high_price: symboldata['high_price'],
                  opening_price: symboldata['opening_price'],
                  stock_sign: symboldata['stock_sign'],
                  symbol: symboldata['symbol'],
                  type: symboldata['type'],
                };

                if (quotedata['c']) {
                  finalDataSet['current_price'] = quotedata['c'];
                }
                if (quotedata['dp']) {
                  finalDataSet['change_today'] = quotedata['dp'];
                  finalDataSet['stock_sign'] =
                    quotedata['dp'] > 0 ? 'up' : 'down';
                }
                if (quotedata['o']) {
                  finalDataSet['opening_price'] = quotedata['o'];
                }
                if (quotedata['h']) {
                  finalDataSet['high_price'] = quotedata['h'];
                }

                var symbol = symboldata['displaySymbol'];
                if (!this.checkIfExists(symbol)) {
                  console.log(finalDataSet);
                  this.listData.push(finalDataSet);
                  localStorage.setItem(
                    'stockArr',
                    JSON.stringify(this.listData)
                  );
                  this.stockSymbol.push(symbol);
                  localStorage.setItem(
                    'searchSymbol',
                    JSON.stringify(this.stockSymbol)
                  );
                }
                this.isLoaded = true;
              });
          }
        },
        complete: () => {},
        error: (err) => {},
      });
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
