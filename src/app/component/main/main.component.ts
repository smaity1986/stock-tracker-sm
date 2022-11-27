import { Component, OnInit } from '@angular/core';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  listData = [];
  isLoaded = false;
  showLoader = false;
  stockArr = [];
  constructor(private stockDataService: StockDataService) {}

  ngOnInit() {
    this.showLoader = true;
    let stockArr = localStorage.getItem('stockArr');
    stockArr = JSON.parse(stockArr);
    Object.assign(this.listData, stockArr);
    this.showLoader = false;
    this.isLoaded = true;
    localStorage.removeItem('isback');
  }

  searchData(searchVal) {
    this.showLoader = true;
    this.stockDataService.getStockBySymbol(searchVal).subscribe((d) => {
      var selectedRec = {};
      if (d['count'] > 0) {
        d['result'].map((v, k) => {
          if (v.displaySymbol == searchVal) {
            selectedRec = v;
            return;
          }
        });
        this.stockDataService.getQuoteBySymbol(searchVal).subscribe((d) => {
          this.rearrangeData(selectedRec, d);
        });
        this.showLoader = false;
      }
    });
  }

  rearrangeData(symboldata, quotedata) {
    let finalDataSet = {};
    finalDataSet = symboldata;
    if (quotedata.c) {
      finalDataSet['current_price'] = '$' + quotedata.c;
    }
    if (quotedata.dp) {
      finalDataSet['change_today'] = quotedata.dp + '%';
      finalDataSet['stock_sign'] = quotedata.dp > 0 ? 'up' : 'down';
    }
    if (quotedata.o) {
      finalDataSet['opening_price'] = '$' + quotedata.o;
    }
    if (quotedata.h) {
      finalDataSet['high_price'] = '$' + quotedata.h;
    }

    var symbol = symboldata.displaySymbol;
    if (!this.checkIfExists(symbol)) {
      this.stockArr.push(finalDataSet);
      localStorage.setItem('stockArr', JSON.stringify(this.stockArr));
      this.listData.push(finalDataSet);
    }
    this.isLoaded = true;
  }

  checkIfExists(symbol) {
    var isMatched = false;
    let stockArr = localStorage.getItem('stockArr');
    if (!stockArr) {
      this.stockArr = [];
      return isMatched;
    }

    JSON.parse(stockArr).map((v, k) => {
      if (v.displaySymbol == symbol) {
        isMatched = true;
        return;
      }
    });

    return isMatched;
  }

  clearMainData(symbol) {
    this.listData.map((v, k) => {
      if (v.displaySymbol == symbol) {
        this.listData.splice(k, 1);
        return;
      }
    });
    console.log(this.listData, symbol);
  }
}
