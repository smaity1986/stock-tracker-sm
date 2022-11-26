import { Component, OnInit } from '@angular/core';
import { StockDataService } from '../../services/stock-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  stockModel = {
    stockInput: '',
  };

  listDataSet = [];

  constructor(private stockDataService: StockDataService) {}

  ngOnInit() {}

  onSubmit(data) {
    let searchVal = data.stockInput.toUpperCase();
    console.log(searchVal);
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
        console.log(selectedRec);
        this.stockDataService.getQuoteBySymbol(searchVal).subscribe((d) => {
          this.rearrangeData(selectedRec, d)
        });
      }
    });
  }

  rearrangeData(symboldata, quotedata){
    let finalDataSet = {};

    if(quotedata.c){
      finalDataSet['current_price'] = '$' + quotedata.c;
    }

    if(quotedata.c){
      finalDataSet['current_price'] = '$' + quotedata.c;
    }
    

    if(quotedata.c){
      finalDataSet['current_price'] = '$' + quotedata.c;
    }
    
    

    finalDataSet['symboldata'] = symboldata;
    finalDataSet['quotedata'] = quotedata;
  }
}
