import { Component, OnInit } from '@angular/core';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  listData;
  constructor(private stockDataService: StockDataService) {}

  ngOnInit() {}

  searchData(searchVal) {
    this.stockDataService.getStockBySymbol(searchVal).subscribe((d) => {
      var selectedRec = {};
      if (d['count'] > 0) {
        d['result'].map((v, k) => {
          if (v.displaySymbol == searchVal) {
            selectedRec = v;
            return;
          }
        });
        // var stockName = d['result'][0];
        //console.log(selectedRec);
        this.stockDataService.getQuoteBySymbol(searchVal).subscribe((d) => {
          this.listData = this.rearrangeData(selectedRec, d);
        });
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
    console.log(finalDataSet);
    return finalDataSet;
  }
}
